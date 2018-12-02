"""Create synthetic data for differentiation of mobile/web."""

import numpy as np
import pandas as pd
from src.misc import TEXT_EXAMPLES, DBConnection


class SyntheticData(object):
    TEXT = TEXT_EXAMPLES
    POSITION = np.arange(10)
    MOBILE = np.array([True, False])
    AGE = (np.arange(5) + 1) * 10
    GENDER = np.arange(2)
    REGION = np.arange(2)

    DATA_TABLE = "buttons"

    def __init__(self, n=1000, bias=True, mobile=True):
        """Create synthetic data."""
        self.result = None
        self.n = n
        self.bias = bias
        self.mobile = mobile

        self.create()
        self.save()

    def create(self):
        """Create n synthetic data."""
        self.result = pd.DataFrame(data={'text': [], 'position': [], 'mobile': [
        ], 'age': [], 'gender': [], 'region': [], 'ctd': []})

        if not self.bias:
            self.result['text'] = np.random.choice(self.TEXT, self.n)
            self.result['position'] = np.random.choice(self.POSITION, self.n)
            self.result['mobile'] = np.random.choice(self.MOBILE, self.n)
            self.result['age'] = np.random.choice(self.AGE, self.n)
            self.result['gender'] = np.random.choice(self.GENDER, self.n)
            self.result['region'] = np.random.choice(self.REGION, self.n)
            self.result['synthetic'] = np.full([self.n], True)

            self.result['ctd'] = np.abs(
                np.random.normal(loc=7, scale=.8, size=self.n)) * 1000

        else:
            if self.mobile:
                self.result['text'] = np.random.choice([self.TEXT[6]], self.n)
                self.result['position'] = np.random.choice([5], self.n)
                self.result['mobile'] = np.random.choice([True], self.n)
                self.result['age'] = np.random.choice(self.AGE, self.n)
                self.result['gender'] = np.random.choice(self.GENDER, self.n)
                self.result['region'] = np.random.choice(self.REGION, self.n)
                self.result['synthetic'] = np.full([self.n], True)
                self.result['ctd'] = np.abs(np.random.normal(
                    loc=3, scale=.8, size=self.n)) * 1000

            else:
                self.result['text'] = np.random.choice([self.TEXT[5]], self.n)
                self.result['position'] = np.random.choice([2], self.n)
                self.result['mobile'] = np.random.choice([False], self.n)
                self.result['age'] = np.random.choice(self.AGE, self.n)
                self.result['gender'] = np.random.choice(self.GENDER, self.n)
                self.result['region'] = np.random.choice(self.REGION, self.n)
                self.result['synthetic'] = np.full([self.n], True)
                self.result['ctd'] = np.abs(np.random.normal(
                    loc=3, scale=.8, size=self.n)) * 1000

    def save(self):
        """Save the data to the DB."""
        db = DBConnection()
        self.result.to_sql(
            self.DATA_TABLE, db.engine, if_exists='append', index=False)
