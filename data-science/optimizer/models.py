"""A Model optimization class that will find the min delay for each of the models."""


class ModelOptimizer():
    """Create sets of params and compute delay for each."""

    API = ""

    def __init__(self):
        """Initiate and run the optimizer."""
        self.run()

    def run(self):
        """Run through a range of combination of the parameters."""
        # enumerate the parameters

        # run the model

        # find the min for the output neuron

        # store the min param for the model

    def save(self, min_params):
        """Save the model in the database."""
        # call the API and save the optimized model params to the DB."""

        requests.post('{}/models'.format(self.API), json=min_params)
