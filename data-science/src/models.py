"""Holds classes to Train and Predict."""
import numpy as np

import pandas as pd
from src.helpers import encoders, preprocess_predict, preprocess_training
from src.misc import DBConnection
from src.training_model import run_prediction, run_training


class ModelActions():
    """Parent class for the other models with shared code."""

    DATA_TABLE = "buttons"
    MODEL_TABLE = "models"

    def __init__(self):
        """Create holding variables."""
        self.data = None
        self.in_scaled = None
        self.in_scaler = None
        self.out_scaled = None
        self.out_scaler = None
        self.le_txt = None

        self.result = None


class TrainModel(ModelActions):
    """Train a new model given all the data."""

    def __init__(self):
        """Train the model pulling data from the DB."""
        super().__init__()
        self.db_connection = DBConnection()

        self.load()

    def load(self):
        """Load the data from the database."""
        self.data = pd.read_sql(
            "SELECT id, text, position, ctd, mobile, age, gender, region FROM {}".format(
                self.DATA_TABLE),
            self.db_connection.connection, index_col='id')

        print('the data', self.data)
        print(self.data.columns)

        self.normalise()
        self.run()

    def normalise(self):
        """Normalise the data to feed to the Model."""
        self.in_scaler, self.out_scaler, self.le_txt = encoders(self.data)
        self.in_scaled, self.out_scaled = preprocess_training(
            self.data, self.le_txt, self.in_scaler, self.out_scaler)
        print(self.data.columns)

    def run(self):
        """Run the model."""
        run_training(self.in_scaled, self.out_scaled, self.in_scaler,
                     self.out_scaler, self.le_txt)

    def save(self):
        """Save the models to the db."""
        self.result.to_sql(
            self.MODEL_TABLE, self.db_connection.connection, if_exists='append')


class ModelOptimizer(ModelActions):
    """Create sets of params and compute delay for each."""

    TEXT = ["Click here", "Sign up", "get involved!",
            "newsletter sign up", "please click me", "enter your email"]
    POSITION = np.arange(10)
    MOBILE = np.array([True, False])
    AGE = (np.arange(5) + 1) * 10
    GENDER = np.arange(2)
    REGION = np.arange(2)

    MODEL_TABLE = "models"

    def __init__(self):
        """Initiate and run the optimizer."""
        # create all the combinations of the parameters to compute a ctd
        # for each one, using the model
        super().__init__()
        combinations = np.array(np.meshgrid(
            self.TEXT, self.POSITION, self.MOBILE, self.AGE, self.GENDER, self.REGION)).T.reshape(-1, 6)

        dtypes = {'text': 'object', 'position': 'int', 'mobile': 'bool',
                  'age': 'int', 'gender': 'int', 'region': 'int'}
        self.data = pd.DataFrame(combinations, columns=[
                                 'text', 'position', 'mobile', 'age', 'gender', 'region'])
        self.data = self.data.astype(dtypes)

        self.normalise()
        self.run()

    def normalise(self):
        """Normalise the data to feed to the Model."""
        self.in_scaler, self.out_scaler, self.le_txt = encoders(self.data)
        self.in_scaled = preprocess_predict(
            self.data, self.le_txt, self.in_scaler)
        print(self.data.columns)

    def run(self):
        """Run through a range of combination of the parameters."""
        run_prediction(self.in_scaled, self.in_scaler,
                       self.le_txt, 'optimusai')

    def save(self, min_params):
        """Save the model in the database."""
        # call the API and save the optimized model params to the DB."""

        requests.post('{}/models'.format(self.API), json=min_params)
