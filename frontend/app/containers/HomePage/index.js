/*
 * HomePage
 *
 * This page shows the changes OptimusSite has made to your UI over time.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getButtonData } from '../TestingPage/actions';
import { makeSelectButtonData } from '../TestingPage/selectors';

import Header from '../../components/Header';
import Result from '../../components/Result';
import Insights from '../../components/Insights';
import Slider from '../../components/Slider';
import PlayPause from '../../components/PlayPause';

import { HomeSt, ResultsSt, ControlSt } from './style';

const INTERVAL_SPEED = 1000;

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
      playing: false,
    };
  }

  componentDidMount() {
    const { onGetButtonData } = this.props;

    onGetButtonData();
  }

  componentWillReceiveProps(nextProps) {
    const { buttonData } = this.props;

    const desktopButtonData = nextProps.buttonData.reduce((list, data) => {
      if (data.combination[2] === 0) list.push(data);
      return list;
    }, []);

    // Jump slider to the most recent model
    if (nextProps.buttonData.length !== buttonData.length) {
      this.setState({ currentIndex: desktopButtonData.length - 1 });
    }
  }

  /*
  * Called on an interval to step through models
  */
  nextModel = () => {
    const { currentIndex } = this.state;
    const { buttonData } = this.props;

    const desktopButtonData = buttonData.reduce((list, data) => {
      if (data.combination[2] === 0) list.push(data);
      return list;
    }, []);

    // Increment until finished, in which case we cancel the interval
    if (currentIndex < desktopButtonData.length - 1) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
      }));
    } else {
      window.clearInterval(this.interval);
      this.interval = undefined;
      this.setState({
        playing: false,
      });
    }
  };

  /*
  * Play / pause button click handler
  */
  togglePlaying = () => {
    const { buttonData } = this.props;
    const { playing, currentIndex } = this.state;

    const desktopButtonData = buttonData.reduce((list, data) => {
      if (data.combination[2] === 0) list.push(data);
      return list;
    }, []);

    // Use setInterval to manage the model timeline
    if (playing) {
      window.clearInterval(this.interval);
      this.interval = undefined;
      this.setState({
        playing: false,
      });
    } else {
      const newState = {
        playing: true,
      };

      if (currentIndex === desktopButtonData.length - 1) {
        newState.currentIndex = 0;
      }

      this.interval = window.setInterval(this.nextModel, INTERVAL_SPEED);
      this.setState(newState);
    }
  };

  render() {
    const { playing, currentIndex } = this.state;
    const { buttonData } = this.props;
    const desktopButtonData = buttonData.reduce((list, data) => {
      if (data.combination[2] === 0) list.push(data);
      return list;
    }, []);

    const curr = desktopButtonData[currentIndex].combination;
    const currentButtonData = {
      text: curr[0],
      position: curr[1],
      ctd: desktopButtonData[currentIndex].ctd,
    };

    const ctdDifference =
      (desktopButtonData[0].ctd -
        desktopButtonData[desktopButtonData.length - 1].ctd) /
      1000;

    return (
      <>
        <Header>
          <span>OptimusSite</span>
          <Link to="/testing">Testing</Link>
        </Header>
        <HomeSt>
          <div>
            <ResultsSt playing={playing}>
              <div className="ctd">CTD: {currentButtonData.ctd / 1000}s</div>
              <Result currentButtonData={currentButtonData} />
              <Insights
                playing={playing}
                modelCount={desktopButtonData.length}
                ctdDifference={ctdDifference}
              />
            </ResultsSt>
            <Slider
              time={currentButtonData.created_at}
              pos={(currentIndex / (desktopButtonData.length - 1)) * 100}
            />
            <ControlSt>
              <PlayPause onClick={this.togglePlaying} playing={playing} />
            </ControlSt>
          </div>
        </HomeSt>
      </>
    );
  }
}

HomePage.propTypes = {
  buttonData: PropTypes.arrayOf(PropTypes.object),
  onGetButtonData: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  buttonData: [
    {
      combination: ['BUY NOW', 0, 0],
    },
  ],
};

const mapStateToProps = createStructuredSelector({
  buttonData: makeSelectButtonData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetButtonData: () => dispatch(getButtonData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
