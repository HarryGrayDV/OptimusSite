# OptimusSite
OptimusSite is an autonomous AI Conversion Rate Optimiser (CRO) that helps companies to personalise layout and content to maximise conversion - eliminating the need for slow and costly A/B testing.

We are a team of four engineers representing DV London at DV Hacks AI.


#### Team
- Rogerio Candeias - Engineering director, ML virtuoso
- David Cava Piña - Senior engineer (backend + data science)
- Geoff Cheah - Engineer (backend)
- Harry Jones - Senior engineer (design + frontend)


## Documentation
#### Data Science  
##### Neural Network
A feed-forward neural network is employed to calculated the best combination of parameters to choose. We a 3 level NN that we train using Batch Normalization to reduce overfitting. From experiments, the chosen parameters seem to be able to achieve convergence at around 250 epochs.

```sh
Epoch 1/250
1500/1500 [==============================] - 1s 336us/step - loss: 23105613.6000
Epoch 2/250
1500/1500 [==============================] - 0s 31us/step - loss: 23100955.8667

...

Epoch 249/250
1500/1500 [==============================] - 0s 29us/step - loss: 887304.2625
Epoch 250/250
1500/1500 [==============================] - 0s 32us/step - loss: 830035.6417
```

Here is the summary of one of the trained models

```sh
_________________________________________________________________
Layer (type)                 Output Shape              Param #
=================================================================
dense_1 (Dense)              (None, 6)                 42
_________________________________________________________________
batch_normalization_1 (Batch (None, 6)                 24
_________________________________________________________________
activation_1 (Activation)    (None, 6)                 0
_________________________________________________________________
dense_2 (Dense)              (None, 8)                 56
_________________________________________________________________
dense_3 (Dense)              (None, 16)                144
_________________________________________________________________
dense_4 (Dense)              (None, 8)                 136
_________________________________________________________________
dense_5 (Dense)              (None, 1)                 9
=================================================================
Total params: 411
Trainable params: 399
Non-trainable params: 12
_________________________________________________________________
```

To train the network locally or getting and optimized result, simple run:
```sh
$ cd data-science
$ pip install pipenv
$ pipenv shell
$ export FLASK_APP=application.py
$ export FLASK_ENV=development
$ export DATABASE_URL=postgres://optimussite:optimussite1@optimussite.cbea2zth9oyg.us-east-1.rds.amazonaws.com:8080/optimussite
$ flask run
```  
At this point, you should have a flaks app running on http://127.0.0.1:5000/ that is able to create synthetic data, train models and find the best set of parameters to minimize the cost function (in this case ctd: click_through_delta).

In another terminal you can do:

```sh
$ curl 'http://127.0.0.1:5000/synthetic/unbiased/500/'
```
to create 500 random synthetic datapoints

```sh
$ curl 'http://127.0.0.1:5000/synthetic/web/500/'
```
for 500 data points that minimize a few params for the web

```sh
$ curl 'http://127.0.0.1:5000/synthetic/mobile/500/'
```
and for mobile.

Now, you can train a model (that is saved to the local filesystem) and find the best params for it

```sh
$ curl 'http://127.0.0.1:5000/train/'
$ curl 'http://127.0.0.1:5000/optimize/'
```

##### NLP
An additional twitter scraper with an LDA (Latent Dirichlet Allocation) algorithm for topic detection has been developed.  
It scrapes the tweets of relevant companies of the sector of interest in the look for the most liked topics.  
Those topics can be used to score every possible call to action, in order to select only the most relevant ones according to the taste of the potential customers

To run the scraper:
```sh
$ cd data-science
$ pipenv shell
$ python nlp/twitterscraper.py
```

Unfortunately the did not had time to integrate with the NN.

#### Backend
[See the Readme File](backend/Readme.md)



#### Frontend
The frontend is built in [React](https://reactjs.org/), using [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) for scaffolding.

To build for dev, simply run:
```sh
$ cd frontend
$ npm install
$ npm run start
```
The development server will run on `localhost:3000`


#### Design + brand
The Sketch design files can be found at `designs/designs.sketch`
