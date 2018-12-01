"""Holds classes to Train and Predict."""
import pandas as pd
from src.helpers import encoders, preprocess_training
from src.misc import DBConnection


class TrainModel():

    TABLE = "buttons"

    def __init__(self):
        """Train the model pulling data from the DB."""
        self.db_connection = DBConnection()

        self.data = None
        self.in_scaled = None
        self.out_scaled = None

        self.load()

    def load(self):
        """Load the data from the database."""
        self.data = pd.read_sql(
            "SELECT * FROM {}".format(self.TABLE),
            self.db_connection.connection)

        print('the data', self.data)

        self.normalise()

    def normalise(self):
        """Normalise the data to feed to the Model."""
        in_scaler, out_scaler, le_txt = encoders(self.data)
        self.in_scaled, self.out_scaled = preprocess_training(
            self.data, le_txt, in_scaler, out_scaler)

        print(self.in_scaled)

    def run(self):
        """Run the model."""
        # run it

    def save(self):
        """Save the models to the db."""
