import dayjs from 'dayjs';
import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';
import { CALENDAR } from '../../constants';
import { useCalendar } from '../../hooks/useCalendar';
import Modal from '../Modal/Modal';
import Portal from '../Portal/Portal';
import classes from './Calendar.module.scss';

export interface CalendarProps {}

export interface CalendarState {
  isAddDayDataModalOpen: boolean;
  isDayDetailsModalOpen: boolean;
  clickedDate: string | null;
  tradeNotes: string;
  tradeType: 'long' | 'short';
  basePair: string;
  quotePair: string;
  entryPrice: string;
  exitPrice: string;
  quantity: string;
  trades: {
    id: number;
    date: string;
    type: 'long' | 'short';
    madeProfit: boolean;
    notes: string;
    pair: {
      base: string;
      quote: string;
    };
    entryPrice: number;
    exitPrice: number;
    quantity: number;
  }[];
}

const Calendar: FC<CalendarProps> = () => {
  const [state, setState] = useState<CalendarState>({
    isAddDayDataModalOpen: false,
    isDayDetailsModalOpen: false,
    clickedDate: null,
    tradeNotes: '',
    entryPrice: '',
    exitPrice: '',
    tradeType: 'long',
    basePair: '',
    quotePair: '',
    quantity: '',
    trades: [
      {
        id: 1,
        date: '2022-09-01',
        type: 'long',
        madeProfit: true,
        notes: 'Trade 1 notes',
        pair: {
          base: 'BTC',
          quote: 'USDT',
        },
        entryPrice: 19574,
        exitPrice: 20000,
        quantity: 0.01547,
      },
      {
        id: 2,
        date: '2022-09-01',
        type: 'short',
        madeProfit: false,
        notes: "I saw a reversal that didn't happen",
        pair: {
          base: 'BTC',
          quote: 'USDT',
        },
        entryPrice: 20000,
        exitPrice: 20147,
        quantity: 0.005748,
      },
      {
        id: 3,
        date: '2022-09-03',
        type: 'short',
        madeProfit: true,
        notes: 'Trade 3 notes',
        pair: {
          base: 'ETH',
          quote: 'USDT',
        },
        entryPrice: 19574,
        exitPrice: 19000,
        quantity: 0.254,
      },
    ],
  });

  const { today, currentMonth, days, day, month, year, startDay, displayedDays, setDate } = useCalendar();

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'tradeAmount' && value !== '' && !/^\d+$/.test(value)) {
      return setState((prevState) => ({
        ...prevState,
        [name]: Math.abs(+value) + '',
      }));
    }

    setState((ps) => ({ ...ps, [name]: value }));
  };
  const onDayClick = (clickedDay: number, event: MouseEvent<HTMLDivElement>) => {
    setState((ps) => ({
      ...ps,
      clickedDate: `${year}-${month < 10 ? `0${month + 1}` : month + 1}-${
        clickedDay < 10 ? `0${clickedDay}` : clickedDay
      }`,
      isDayDetailsModalOpen: true,
    }));
  };

  const onAddTrade = (event: FormEvent<HTMLFormElement>) => {
    return setState((ps) => ({
      ...ps,
      isAddDayDataModalOpen: false,
      tradeNotes: '',
      entryPrice: '',
      exitPrice: '',
      pair: {
        base: '',
        quote: '',
      },
      quantity: '',
      tradeType: 'long',
      trades: [
        ...ps.trades,
        {
          id: Math.random() * 1000,
          date: state.clickedDate as string,
          type: state.tradeType,
          notes: state.tradeNotes,
          entryPrice: +state.entryPrice,
          exitPrice: +state.exitPrice,
          pair: {
            base: state.basePair,
            quote: state.quotePair,
          },
          quantity: +state.quantity,
          madeProfit:
            state.tradeType === 'long' ? +state.exitPrice > +state.entryPrice : +state.exitPrice < +state.entryPrice,
        },
      ],
    }));
  };

  return (
    <div className={classes.Container}>
      <header>
        <button onClick={() => setDate(new Date(year, month - 1, day))}>Prev</button>
        <div>
          {currentMonth} {year}
        </div>
        <button onClick={() => setDate(new Date(year, month + 1, day))}>Next</button>
      </header>
      <main>
        {CALENDAR.DAYS_OF_THE_WEEK.map((d) => (
          <div className={classes.Day__Name} key={d}>
            <strong>{d}</strong>
          </div>
        ))}
        {Array(displayedDays)
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            let dayNumber = `${d}`;
            const previousMonthNumberOfDays = days[month === 0 ? 11 : month - 1];

            if (d < 10 && d > 0) dayNumber = `0${d}`;
            if (d < 1) dayNumber = `${previousMonthNumberOfDays + d}`;
            if (d > days[month]) dayNumber = `0${d - days[month]}`;

            const isPreviousMonth = d < 1;
            const isNextMonth = d > days[month];

            const dayData = state.trades
              .filter(
                (t) =>
                  !isPreviousMonth &&
                  !isNextMonth &&
                  t.date === `${year}-${month < 10 ? `0${month + 1}` : month + 1}-${dayNumber}`,
              )
              .reduce(
                (acc, curr) => {
                  if (curr.type === 'long') {
                    acc.amount += (curr.exitPrice - curr.entryPrice) * curr.quantity;
                  } else {
                    acc.amount += (curr.entryPrice - curr.exitPrice) * curr.quantity;
                  }

                  acc.trades += 1;

                  return acc;
                },
                { amount: 0, trades: 0 },
              );

            return (
              <div
                className={`${classes.Day} ${d === day ? classes.Selected : ''} ${
                  d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                    ? classes.Today
                    : ''
                }
                  ${isPreviousMonth ? classes.Previous : ''}
                  ${isNextMonth ? classes.Next : ''}
                  `}
                key={index}
                onClick={(event) => onDayClick(d, event)}>
                <div>
                  {dayData && dayData.trades > 0 && (
                    <>
                      <div className={classes.Day__Trades}>
                        <span>{dayData.trades} trades</span>
                      </div>
                      <div>
                        <span>{dayData.amount.toFixed(2)}€</span>
                      </div>
                    </>
                  )}
                </div>
                <span className={classes.Day__Number}>{+dayNumber > 0 ? dayNumber : ''}</span>
              </div>
            );
          })}
      </main>
      <Portal animate animationDuration={200} mount={state.isAddDayDataModalOpen}>
        <Modal
          type="add-day-data"
          title="Add trade"
          classNames={{
            modal: classes.Modal,
            body: classes.Modal__Body,
          }}
          onCancel={() => setState((ps) => ({ ...ps, isAddDayDataModalOpen: false }))}
          onConfirm={onAddTrade}
          clickOutside
          withButtons
          confirmText="Add trade"
          buttonTheme="confirm-green">
          <div className={classes.AddDayData}>
            <div>
              <label htmlFor="tradeType">Trade type</label>
              <select name="tradeType" id="tradeType" value={state.tradeType} onChange={onInputChange}>
                <option value="long">Long</option>
                <option value="short">Short</option>
              </select>
            </div>
            <div>
              <label htmlFor="base-pair">
                Base currency <span>(e.g. BTC)</span>
              </label>
              <input name="basePair" id="base-pair" value={state.basePair} onChange={onInputChange} />
            </div>
            <div>
              <label htmlFor="quote-pair">
                Quote currency <span>(e.g. USDT)</span>
              </label>
              <input name="quotePair" id="quote-pair" value={state.quotePair} onChange={onInputChange} />
            </div>
            <div>
              <label htmlFor="trade-notes">Notes</label>
              <textarea name="tradeNotes" value={state.tradeNotes} onChange={onInputChange} id="trade-notes" />
            </div>
            <div>
              <label htmlFor="entry-price">Entry price</label>
              <input
                name="entryPrice"
                value={state.entryPrice}
                onChange={onInputChange}
                id="entry-price"
                type="number"
              />
            </div>
            <div>
              <label htmlFor="exit-price">Exit price</label>
              <input name="exitPrice" value={state.exitPrice} onChange={onInputChange} id="exit-price" type="number" />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input name="quantity" value={state.quantity} onChange={onInputChange} id="quantity" type="number" />
            </div>
          </div>
        </Modal>
      </Portal>
      <Portal animate animationDuration={200} mount={state.isDayDetailsModalOpen && state.clickedDate !== null}>
        <Modal
          type="day-details"
          title={`${dayjs(state.clickedDate).format('DD MMMM YYYY')}`}
          classNames={{
            modal: classes.Day_Details_Modal,
            body: classes.Modal__Body,
          }}
          clickOutside
          onCancel={() => setState((ps) => ({ ...ps, isDayDetailsModalOpen: false }))}>
          <button
            className={classes.Btn__Main}
            type="button"
            onClick={() => setState((ps) => ({ ...ps, isAddDayDataModalOpen: true }))}>
            Add trade
          </button>

          {state.trades.filter((trade) => trade.date === state.clickedDate).length ? (
            <>
              <table className={classes.DayDetails}>
                <thead>
                  <tr>
                    <th>Pair</th>
                    <th>Type</th>
                    <th>Entry price</th>
                    <th>Exit price</th>
                    <th>Quantity</th>
                    <th>Notes</th>
                    <th>Profitable</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {state.trades
                    .filter((t) => t.date === state.clickedDate)
                    .map((trade) => (
                      <tr key={trade.id}>
                        <td>
                          {trade.pair.base}/{trade.pair.quote}
                        </td>
                        <td className={classes.Trade_Type}>
                          {trade.type === 'long' ? (
                            <span className={classes.Trade_Long}>&#8593;</span>
                          ) : (
                            <span className={classes.Trade_Short}>&#8595;</span>
                          )}
                          <span>{trade.type}</span>
                        </td>
                        <td>{trade.entryPrice}</td>
                        <td>{trade.exitPrice}</td>
                        <td>{trade.quantity}</td>
                        <td>{trade.notes}</td>
                        <td>
                          {trade.madeProfit ? (
                            <span className={classes.Trade_Profitable}>&#10004;</span>
                          ) : (
                            <span className={classes.Trade_Unprofitable}>&#10006;</span>
                          )}
                        </td>
                        <td>
                          {trade.type === 'long'
                            ? ((trade.exitPrice - trade.entryPrice) * trade.quantity).toFixed(2)
                            : ((trade.entryPrice - trade.exitPrice) * trade.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={7}>Total</td>
                    <td>
                      {state.trades
                        .filter((t) => t.date === state.clickedDate)
                        .reduce((acc, curr) => {
                          if (curr.type === 'long') {
                            acc += (curr.exitPrice - curr.entryPrice) * curr.quantity;
                          } else {
                            acc += (curr.entryPrice - curr.exitPrice) * curr.quantity;
                          }

                          return acc;
                        }, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </>
          ) : (
            <div className={classes.Day_Details__No_Data}>No data for this day</div>
          )}
        </Modal>
      </Portal>
    </div>
  );
};

export default Calendar;
