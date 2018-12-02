import numpy  as  np
import twitter, datetime
import csv
import pandas as pd

# ENV VARS
USER = 'lacroixwater'
twitter_keys = {
    'consumer_key':        'L4sziHBqV4VUIfKezbos0JMVl',
    'consumer_secret':     'lJau6R7GIHFwoGR5wB3PlLQPXBChwzJFJ9WGXXtazcDSA1Vb1X',
    'access_token_key':    '941359629606539264-05XcmQfdwMXTbPNWS3r7cZThvbQBxCK',
    'access_token_secret': 'VdE3VJVk6oxbohQGcw7WYA5Tg4Sr8kW9duTO1wxmB6qXk'
}

api = twitter.Api(
    consumer_key         =   twitter_keys['consumer_key'],
    consumer_secret      =   twitter_keys['consumer_secret'],
    access_token_key     =   twitter_keys['access_token_key'],
    access_token_secret  =   twitter_keys['access_token_secret'],
    tweet_mode = 'extended'
)

#TweetMiner function from Mike Roman

class TweetMiner(object):

    
    def __init__(self, api, result_limit = 100):
        
        self.api = api        
        self.result_limit = result_limit
        

    def mine_user_tweets(self, user="lacroixwater", mine_retweets=False, max_pages=20):

        data           =  []
        last_tweet_id  =  False
        page           =  1
        
        while page <= max_pages:
            
            if last_tweet_id:
                statuses   =   self.api.GetUserTimeline(screen_name=user, count=self.result_limit, max_id=last_tweet_id - 1, include_rts=mine_retweets)
                statuses = [ _.AsDict() for _ in statuses]
            else:
                statuses   =   self.api.GetUserTimeline(screen_name=user, count=self.result_limit, include_rts=mine_retweets)
                statuses = [_.AsDict() for _ in statuses]
                
            for item in statuses:
                # Using try except here.
                # When retweets = 0 we get an error (GetUserTimeline fails to create a key, 'retweet_count')
                try:
                    mined = {
                        #'tweet_id':        item['id'],
                        'handle':          item['user']['screen_name'],
                        'favorite_count':  item['favorite_count'],
                        'text':            item['full_text'],
                        'mined_at':        datetime.datetime.now(),
                        #'created_at':      item['created_at'],
                    }
                
                except:
                        mined = {
                        #'tweet_id':        item['id'],
                        'handle':          item['user']['screen_name'],
                        'favorite_count':   0,
                        'text':            item['full_text'],
                        'mined_at':        datetime.datetime.now(),
                        #'created_at':      item['created_at'],
                    }
                
                last_tweet_id = item['id']
                data.append(mined)
                
            page += 1
            
        return data

# Result limit == count parameter from our GetUserTimeline()
miner = TweetMiner(api, result_limit=200)

# Get the tweets from competitor with relevant likes
competitor  =  miner.mine_user_tweets(user=USER)
competitor_df = pd.DataFrame(competitor)
favorite_mask = competitor_df[competitor_df['favorite_count'] > 10]
favorite_mean = favorite_mask['favorite_count'].mean().astype(int)
competitor_df = competitor_df[competitor_df['favorite_count'] > favorite_mean ].sort_values(by=['favorite_count'], ascending=False).reset_index(drop = True)
competitor_txt_df = competitor_df['text']

# Storing it in a csv file for training
competitor_txt_df.to_csv('nlp/inputs.csv', sep='\t', encoding='utf-8')