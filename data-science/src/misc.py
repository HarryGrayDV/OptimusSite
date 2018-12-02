"""List of util function for the project."""
import os
import urllib.parse as urlparse

import psycopg2
from sqlalchemy import create_engine

TEXT_EXAMPLES = ["Buy", "Buy Now", "Purchase", "Get It", "Natural Drink Here!", "Drink it today", "Sunday pleasure", "Get It Now", "Make it Rain!", "Pay Now", "Order",
                 "One Click Buy", "Get Last One!", "Natural pleasure", ":yum:", ":heart_eyes_cat: Naturally", "Natural Hapiness", "Summer goals!", "Your ting", "Kanye drinks it"]


class DBConnection():
    """Manage connection to the DB."""

    URL = urlparse.urlparse(os.environ['DATABASE_URL'])

    def __init__(self):
        """Create the connection."""
        self.DBNAME = self.URL.path[1:]
        self.USER = self.URL.username
        self.PASSWORD = self.URL.password
        self.HOST = self.URL.hostname
        self.PORT = self.URL.port

        self.connection = psycopg2.connect(
            dbname=self.DBNAME,
            user=self.USER,
            password=self.PASSWORD,
            host=self.HOST,
            port=self.PORT
        )

    @property
    def engine(self):
        """Return a sqlalchemy engine."""
        return create_engine(os.environ['DATABASE_URL'])

    @property
    def engine_connection(self):
        """Return a connection for the db."""
        return self.engine.connect()
