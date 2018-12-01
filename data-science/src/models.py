"""Holds classes to Train and Predict."""
import pandas as pd
from src.helpers import encoders, preprocess_training
from src.misc import DBConnection
from src.training_model import run_training


class TrainModel():

    DATA_TABLE = "buttons"
    MODEL_TABLE = "models"

    def __init__(self):
        """Train the model pulling data from the DB."""
        self.db_connection = DBConnection()

        self.data = None
        self.in_scaled = None
        self.in_scaler = None
        self.out_scaled = None
        self.out_scaler = None
        self.le_txt = None

        self.result = None

        self.load()

    def load(self):
        """Load the data from the database."""
        self.data = pd.read_sql(
            "SELECT * FROM {}".format(self.DATA_TABLE),
            self.db_connection.connection, index_col='id')

        self.data = self.data.drop(['created_at', 'updated_at'], axis=1)

        print('the data', self.data)
        print(self.data.columns)

        self.normalise()
        self.run()

    def normalise(self):
        """Normalise the data to feed to the Model."""
        self.in_scaler, self.out_scaler, self.le_txt = encoders(self.data)
        self.in_scaled, self.out_scaled = preprocess_training(
            self.data, self.le_txt, self.in_scaler, self.out_scaler)

    def run(self):
        """Run the model."""
        run_training(self.in_scaled, self.out_scaled, self.in_scaler,
                     self.out_scaler, self.le_txt)

    def save(self):
        """Save the models to the db."""
        self.result.to_sql(
            self.MODEL_TABLE, self.db_connection.connection, if_exists='append')
