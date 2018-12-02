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
A feed-forward neural network is employed to calculated the best combination of parameters to choose.  

To train the network locally or getting and optimized result, simple run:
```sh
$ cd data-science
$ pipenv shell
$ export FLASK_APP=application.py
$ export FLASK_ENV=development
$ export DATABASE_URL=postgres://optimussite:optimussite1@optimussite.cbea2zth9oyg.us-east-1.rds.amazonaws.com:8080/optimussite

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

#### Backend
TBC


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