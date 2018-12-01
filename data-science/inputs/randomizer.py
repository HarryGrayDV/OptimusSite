# Create a randomizer
import os
import random
import numpy as np
import pandas as pd

#ENVIRONMENT VARS
PATH = "inputs/raw_data.csv"
# Data set up
text_array = ["Click here", "Sign up", "get involved!", "newsletter sign up", "please click me", "enter your email"]

entries = 1000
columns=['text','position','device','age','gender','region','ctd']
button_params = pd.DataFrame(0, index = np.arange(entries), columns=columns)

for i in range(entries):
    if i < (entries*0.2):
        button_params.ix[i,'text'] = "get involved!"
        button_params.ix[i,'position'] = 1
        button_params.ix[i,'device'] = 1
        button_params.ix[i,'age'] = 24  
        button_params.ix[i,'gender'] = 1
        button_params.ix[i,'region'] = 3
        button_params.ix[i,'ctd'] = 1

    else:
        button_params.ix[i,'text'] = text_array[random.randint(0, len(text_array)-1)]
        button_params.ix[i,'position'] = random.randint(0,10)
        button_params.ix[i,'device'] = random.randint(0,1)
        button_params.ix[i,'age'] = random.randint(13,50)
        button_params.ix[i,'gender'] = random.randint(0,1)
        button_params.ix[i,'region'] = random.randint(0,3)
        button_params.ix[i,'ctd'] = random.randint(0,10000)

button_params.to_csv(PATH)