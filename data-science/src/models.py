"""Holds classes to Train and Predict."""
import pandas as pd
from src.helpers import encoders, preprocess_training
from src.misc import DBConnection


class TrainModel():

    DATA_TABLE = "buttons"
    MODEL_TABLE = "models"

    def __init__(self):
        """Train the model pulling data from the DB."""
        self.db_connection = DBConnection()

        self.data = None
        self.in_scaled = None
        self.out_scaled = None

        self.result = None

        self.load()

    def load(self):
        """Load the data from the database."""
        self.data = pd.read_sql(
            "SELECT * FROM {}".format(self.DATA_TABLE),
            self.db_connection.connection)

        print('the data', self.data)
        print(self.data.columns)

        self.normalise()

    def normalise(self):
        """Normalise the data to feed to the Model."""
        in_scaler, out_scaler, le_txt, le_region = encoders(self.data)
        self.in_scaled, self.out_scaled = preprocess_training(
            self.data, le_txt, le_region, in_scaler, out_scaler)

        print(self.in_scaled)

    def run(self):
        """Run the model."""
        # run it

    def save(self):
        """Save the models to the db."""
        self.result.to_sql(
            self.MODEL_TABLE, self.db_connection.connection, if_exists='append')
