"""List of util function for the project."""
import os
import urllib.parse as urlparse

import psycopg2


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
