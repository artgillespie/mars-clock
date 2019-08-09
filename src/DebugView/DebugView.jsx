import React from 'react';
import {connect} from 'react-redux';
import {MarsCalendar} from '../marsCalendar';


class DebugView extends React.Component {
  render() {
    const { datetime } = this.props;
    const marsTime = new MarsCalendar(datetime);
    const datetimeStr = String(datetime);
    const millis = datetime.getTime();

    return <div>
      <div>Date: {String(marsTime.date)}</div>
      <div>Unix Epoch Millis: {marsTime.millis}</div>
      <div>&Delta;J2000: {this.formatNumber(marsTime.deltaJ2000)}</div>
      <div>Coordinated Mars Time: {this.formatTimeFromHours(marsTime.mtc)}</div>
    </div>;
  }

  formatNumber(n) {
      return n.toLocaleString('en-US', {minimumFractionDigits: 5, maximumFractionDigits:5, useGrouping:true});
  }

  formatTimeFromHours(hours) {
    const hoursPart = Math.floor(hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const minutesPart = Math.floor((hours * 60)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const secondsPart = Math.floor((hours * 3600)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return `${hoursPart}:${minutesPart}:${secondsPart}`;
  }
}

function mapStateToProps(state) {
  return {
    datetime: state.debugView.datetime
  }
}

const connectedDebugView = connect(mapStateToProps)(DebugView);

export {
  connectedDebugView as DebugView
};
