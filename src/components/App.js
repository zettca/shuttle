import React from 'react';
import store from 'store';
import { Twemoji } from 'react-emoji-render';
import Trip from './Trip';
import './App.css';
import { capitalize, getTime, getISODate } from '../helpers';

const URL = 'https://web.tecnico.ulisboa.pt/~ist178013/api/shuttle/';

function getPeriodFromDates(dates) {
  const date = new Date();

  for (const da of dates) {
    const [s1, s2] = [da.start, da.end].map(d => d.split('/').reverse().map(d => Number(d)));
    s1[1]--;
    s2[1]--;
    const [d1, d2] = [s1, s2].map(s => new Date(...s));
    if (date >= d1 && date <= d2) return da.type;
  }

  return 'weekend';
}

class App extends React.Component {
  constructor(props) {
    super(props);

    const data = store.get('data');

    this.state = {
      date: getISODate(),
      time: getTime(),
      campus: 'Taguspark',
      period: 'weekday', //getPeriod(), // day of week
      data: data || undefined,
    };

    this.nextCampus = this.nextCampus.bind(this);
    this.nextPeriod = this.nextPeriod.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    const { data } = this.state;

    if (data === undefined) {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          store.set('data', data);
          this.setState({ data, period: getPeriodFromDates(data.date) });
        });
    } else {
      this.setState({ period: getPeriodFromDates(data.date) });
    }
  }

  nextCampus() {
    const { campus } = this.state;
    const campi = ['Taguspark', 'Alameda'];
    const i = ((campi.indexOf(campus) || 0) + 1) % campi.length;

    this.setState({ campus: campi[i] });
  }

  nextPeriod() {
    const { period } = this.state;
    const periods = ['weekday', 'holidays', 'exams'];
    const i = ((periods.indexOf(period) || 0) + 1) % periods.length;

    this.setState({ period: periods[i] });
  }

  updateTime() {
    this.setState({ time: getTime() });
  }

  render() {
    const { data, time, campus, period } = this.state;
    if (!data) return null;

    const { trips } = data;
    if (!trips) return null;

    const myTrips = trips.filter(t => t.type === period && t.stations[0].station === campus);
    const myCampus = (campus === 'Taguspark') ? 'Taguspark\nAlameda' : 'Alameda\nTaguspark';

    return (
      <main>
        <header>
          <h3>
            <div className={'right big'}>
              <span onClick={this.updateTime} style={{ lineHeight: '3rem' }}>{time}</span>
            </div>
            <div className={'table'}>
              <span className={'block big'} onClick={this.nextPeriod}>{capitalize(period)}</span>
              <span className={'big'}>⇄</span>
              <span className={'block'} onClick={this.nextCampus}>{myCampus}</span>
            </div>
          </h3>
        </header>
        <section id="infos" className={'table'}>
          {(period === 'weekend')
            ? (<div className={'card'}>
              <div>Today is weekend!</div>
              <div><Twemoji svg text={'There is no Shuttle ❌ 🚌 😢'} /></div>
            </div>)
            : myTrips.map((trip, i) => (<Trip key={i} stations={trip.stations} />))}
        </section>
      </main>
    );
  }
}

export default App;
