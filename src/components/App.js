import React from 'react';
import store from 'store';
import moment from 'moment';
import { Twemoji } from 'react-emoji-render';
import Trip from './Trip';
import './App.css';

const URL = 'https://web.tecnico.ulisboa.pt/~ist178013/api/shuttle/';
const DAYOFF_NAME = 'weekend';

class App extends React.Component {
  constructor(props) {
    super(props);

    const data = store.get('data');

    this.state = {
      date: new Date(/*2019, 2, 4, 10, 10, 10*/),
      campus: 'Taguspark',
      period: 'weekday',
      data: data,
    };

    this.nextDate = this.nextDate.bind(this);
    this.nextCampus = this.nextCampus.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.isPastTrip = this.isPastTrip.bind(this);
  }

  componentDidMount() {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        store.set('data', data);
        this.setState({ data });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { date, data } = this.state;

    const period = this.getPeriodFromDates(date, data.date);
    if (period !== prevState.period) {
      this.setState({ period });
    }
  }

  getPeriodFromDates(date, dates) {
    if (dates == null) return null;
    else if (date.getDay() % 6 === 0) return DAYOFF_NAME;

    for (const d of dates) {
      const [d1, d2] = [d.start, d.end].map(d => moment(d, 'DD/MM/YYYY'));
      if (moment(date).isBetween(d1, d2, 'day', '[]')) return d.type;
    }

    return DAYOFF_NAME;
  }

  nextDate() {
    const { date } = this.state;
    date.setDate(date.getDate() + 1);
    this.setState({ date });
  }

  nextCampus() {
    const { campus } = this.state;
    const campi = ['Taguspark', 'Alameda'];
    const i = ((campi.indexOf(campus) || 0) + 1) % campi.length;

    this.setState({ campus: campi[i] });
  }

  updateDate() {
    this.setState({ date: new Date() });
  }

  capitalize(str) {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
  }

  isPastTrip(hr) {
    const { date } = this.state;

    const [min1, min2] = [moment(date), moment(hr, 'HH:mm')].map(m => m.minutes() + m.hours() * 60);
    return min1 > min2;
  }

  render() {
    const { data, date, campus, period } = this.state;
    if (!data || !data.trips) return null;

    const { trips } = data;

    const myCampus = (campus === 'Taguspark') ? ['Tagus', 'Alameda'] : ['Alameda', 'Tagus'];
    const myTrips = trips.filter(t => t.type === period && t.stations[0].station === campus);

    const numPastTrips = myTrips.reduce((acc, t) => acc + this.isPastTrip(t.stations[0].hour), 0);
    const useFilter = moment().isSame(date, 'day') && numPastTrips > 0 && numPastTrips < myTrips.length;

    myTrips.sort((trip1, trip2) => {
      const [d1, d2] = [trip1, trip2].map(t => moment(t.stations[0].hour, 'HH:mm'));
      const [p1, p2] = [d1, d2].map(d => this.isPastTrip(d));
      return (useFilter && p1 + p2 === 1) ? p1 - p2 : d1 - d2;
    });

    return (
      <main>
        <header>
          <h3>
            <div className='right big'>
              <span onClick={this.updateDate} style={{ lineHeight: '3rem' }}>{moment(date).format('HH:mm')}</span>
            </div>
            <div className='table'>
              <span id='title' onClick={this.nextDate}>
                <div className='big'>{moment(date).format('ddd, D MMM')}</div>
                <div>{this.capitalize(period)}</div>
              </span>
              <span id='campus' className='table' onClick={this.nextCampus}>
                <span className='big'>⇄</span>
                <span>{myCampus.join('\n')}</span>
              </span>
            </div>
          </h3>
        </header>
        <section id="infos" className='table'>
          {(period === DAYOFF_NAME)
            ? (<div className='card center'>
              <div>There is no Shuttle for this day!</div>
              <div className='big'><Twemoji svg text={'❌ 🚌 😢 😭'} /></div>
            </div>)
            : myTrips.map((trip, i) => (<Trip key={i} stations={trip.stations}
              isDone={this.isPastTrip(trip.stations[0].hour)}
              useFilter={useFilter} />))}
        </section>
      </main>
    );
  }
}

export default App;
