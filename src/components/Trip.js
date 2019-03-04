import React from 'react';

class Trip extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded(e) {
    e.preventDefault();
    window.getSelection().removeAllRanges();

    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  formatHour(hour) {
    return hour.replace(/\./g, ':');
  }

  createEntry(i, time, value) {
    return (
      <span key={i} className={'entry'}>
        <strong>{time}</strong> {value}
      </span>);
  }

  render() {
    const { expanded } = this.state;
    const { stations, useFilter, isDone } = this.props;
    const ignoreStations = ['Praça de Londres', 'Sete-Rios'];
    const time = this.formatHour(stations[0].hour);

    // create trip-stops string
    const stationsString = stations
      .filter(st => ignoreStations.indexOf(st.station) === -1)
      .map(st => st.station)
      .join(' > ')
      .replace(/Taguspark/g, 'Tagus');

    return (
      <div
        className={`card${useFilter && isDone ? ' done' : ''}`}
        onContextMenu={this.toggleExpanded}
        onDoubleClick={this.toggleExpanded}>
        {!expanded
          ? this.createEntry(0, time, stationsString)
          : stations.map((st, i) => this.createEntry(i, this.formatHour(st.hour), st.station))}
      </div>
    );

  }
}

export default Trip;
