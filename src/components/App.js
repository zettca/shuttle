import React from 'react';
import store from 'store';
import { Twemoji } from 'react-emoji-render';
import Trip from './Trip';
import './App.css';
import { capitalize, getTime, getISODate, isPastTrip, splitTime } from '../helpers';

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
      period: 'weekday',
      currentPeriod: undefined,
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
          const period = getPeriodFromDates(data.date);
          store.set('data', data);
          this.setState({ data, period, currentPeriod: period });
        });
    } else {
      const period = getPeriodFromDates(data.date);
      this.setState({ period, currentPeriod: period });
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
    const { data, time, campus, period, currentPeriod } = this.state;
    if (!data) return null;

    const { trips } = data;
    if (!trips) return null;

    const isCurrentPeriod = period === currentPeriod;
    const myCampus = (campus === 'Taguspark') ? 'Tagus\nAlameda' : 'Alameda\nTagus';
    const myTrips = trips.filter(t => t.type === period && t.stations[0].station === campus);

    if (isCurrentPeriod) {
      myTrips.sort((t1, t2) => {
        const [h1, h2] = [t1, t2].map(t => splitTime(t.stations[0].hour));
        const [p1, p2] = [h1, h2].map(h => isPastTrip(h));
        return ((p1 && p2) || !(p1 || p2)) ? h1[0] - h2[0] : p1 - p2;
      });
    }

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
              <span className={'block normal'} onClick={this.nextCampus}>{myCampus}</span>
            </div>
          </h3>
        </header>
        <section id="infos" className={'table'}>
          {(period === 'weekend')
            ? (<div className={'card'}>
              <div>Today is weekend!</div>
              <div><Twemoji svg text={'There is no Shuttle ❌ 🚌 😢'} /></div>
            </div>)
            : myTrips.map((trip, i) => (<Trip
              key={i}
              isCurrent={isCurrentPeriod}
              stations={trip.stations} />))}
        </section>
      </main>
    );
  }
}

export default App;
