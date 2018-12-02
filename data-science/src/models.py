"""Holds classes to Train and Predict."""
import uuid

import numpy as np
import pandas as pd
from sklearn import preprocessing
from src.misc import TEXT_EXAMPLES, DBConnection
from src.training_model import run_prediction, run_training


class ModelActions():
    """Parent class for the other models with shared code."""

    DATA_TABLE = "buttons"
    MODEL_TABLE = "models"

    # Encoding the labels
    LE_TXT = preprocessing.LabelEncoder()

    # Get all the inputs
    TEXT = TEXT_EXAMPLES
    POSITION = np.arange(10)
    MOBILE = np.arange(2)
    AGE = (np.arange(5) + 1) * 10
    GENDER = np.arange(2)
    REGION = np.arange(2)

    @classmethod
    def get_full_sample_space(cls):
        """Return the full sample space."""
        combinations = np.array(np.meshgrid(
            cls.TEXT, cls.POSITION, cls.MOBILE, cls.AGE, cls.GENDER, cls.REGION)).T.reshape(-1, 6)
        dtypes = {'position': 'int', 'mobile': 'int',
                  'age': 'int', 'gender': 'int', 'region': 'int'}
        result = pd.DataFrame(combinations, columns=[
            'text', 'position', 'mobile', 'age', 'gender', 'region'])
        result = result.astype(dtypes)

        return result

    def __init__(self):
        """Create holding variables."""
        self.db_connection = DBConnection()

        self.data = None
        self.in_scaled = None
        self.in_scaler = None
        self.out_scaled = None
        self.out_scaler = None
        self.le_txt = None

        self.result = None

        self.calibrate_scalers()

    def calibrate_scalers(self):
        """Calibrate the scalers, so that the full sample space is used."""
        self.LE_TXT.fit_transform(TEXT_EXAMPLES)

    def normalise(self, data, output=None):
        """Return normalise with the correct scalers."""
        data['text'] = self.LE_TXT.fit_transform(data['text'])

        self.in_scaled = data.copy()
        self.out_scaled = output


class TrainModel(ModelActions):
    """Train a new model given all the data."""

    def __init__(self):
        """Train the model pulling data from the DB."""
        super().__init__()
        self.model_hash = str(uuid.uuid4()).split('-')[0]

        self.load()

    def load(self):
        """Load the data from the database."""
        self.data = pd.read_sql(
            "SELECT id, text, position, ctd, mobile, age, gender, region FROM {}".format(
                self.DATA_TABLE),
            self.db_connection.connection, index_col='id')

        inputs = self.data.copy().drop('ctd', axis=1)
        outputs = self.data['ctd'].copy().values.reshape(-1, 1)

        self.normalise(inputs, outputs)
        self.run()
        self.save()

    def run(self):
        """Run the model."""
        run_training(self.in_scaled, self.data['ctd'].copy(), self.model_hash)

    def save(self):
        """We save the model hash into the DB."""
        # We just want to have different models being optimized for mobile and web
        tosave = pd.DataFrame({'name': [self.model_hash], 'mobile': True})
        tosave.to_sql(
            self.MODEL_TABLE, self.db_connection.engine, if_exists='append', index=False)

        tosave = pd.DataFrame({'name': [self.model_hash], 'mobile': False})
        tosave.to_sql(
            self.MODEL_TABLE, self.db_connection.engine, if_exists='append', index=False)


class ModelOptimizer(ModelActions):
    """Create sets of params and compute delay for each."""

    def __init__(self):
        """Initiate and run the optimizer."""
        # create all the combinations of the parameters to compute a ctd
        # for each one, using the model
        super().__init__()
        self.data = ModelOptimizer.get_full_sample_space()

        self.get_lastest_model()
        self.normalise(self.data.copy())
        self.run()

    def get_lastest_model(self):
        """Read the latest model that is not optimized from the db."""
        self.model_mobile = pd.read_sql(
            "SELECT * FROM {} WHERE combination IS NULL AND mobile = TRUE AND ctd IS NULL ORDER BY id DESC LIMIT 1".format(
                self.MODEL_TABLE),
            self.db_connection.connection, index_col='id')

        self.model_web = pd.read_sql(
            "SELECT * FROM {} WHERE combination IS NULL AND mobile = FALSE AND ctd IS NULL ORDER BY id DESC LIMIT 1".format(
                self.MODEL_TABLE),
            self.db_connection.connection, index_col='id')

    def run(self):
        """Run through a range of combination of the parameters."""
        filename = self.model_mobile['name'].iloc[0]
        ctd = run_prediction(self.in_scaled, filename)

        print('min and max', ctd.min(), ctd.max())

        # we are going to have 2 versions of the optimal params
        # one for mobile, and other for web
        mobile_index = np.where(self.data['mobile'])[0]
        web_index = np.where(self.data['mobile'] == False)[0]

        print("mobile index", mobile_index)
        print("ctds", ctd[mobile_index])

        # get the order
        mobile_order = ctd[mobile_index].argsort()
        web_order = ctd[web_index].argsort()

        print("order", mobile_order)
        print("sorted ctds", ctd[mobile_index[mobile_order]])

        first_mobile_row = mobile_index[mobile_order][0]
        first_web_row = web_index[web_order][0]

        mobile_params = self.data.loc[first_mobile_row]
        web_params = self.data.loc[first_web_row]

        mobile_combinations = mobile_params.to_json(orient='records')
        web_combinations = web_params.to_json(orient='records')

        print(mobile_combinations)
        print(web_combinations)

        self.save(self.model_mobile.index.tolist()[
                  0], ctd[mobile_index[mobile_order]][0], mobile_combinations)
        self.save(self.model_web.index.tolist()[
                  0], ctd[web_index[web_order]][0], web_combinations)

    def save(self, id, ctd, combination):
        """Save the model in the database."""
        # call the API and save the optimized model params to the DB."""

        self.db_connection.engine_connection.execute(
            "UPDATE {} SET ctd = {}, combination = '{}' WHERE id={}".format(
                self.MODEL_TABLE, ctd, combination, id))
