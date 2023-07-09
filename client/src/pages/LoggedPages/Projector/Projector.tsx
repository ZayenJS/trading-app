import { ChangeEvent, FC, FormEvent, useState } from 'react';
import classes from './Projector.module.scss';

interface Result {
  trade: number;
  moneyTraded: number;
  percentage: number;
  profit: number;
  netTotalGain: number;
  balance: number;
}

interface State {
  percentage: string;
  trades: string;
  initialMoneyTraded: string;
  reinvestGains: boolean;
  results: Result[];
}

const Projector: FC = () => {
  const [state, setState] = useState<State>({
    percentage: '',
    trades: '',
    initialMoneyTraded: '',
    reinvestGains: false,
    results: [],
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedState = { ...state, [name]: value ? +value : '' };

    if (name === 'reinvestGains') {
      updatedState.reinvestGains = event.target.checked;
      return calculate(updatedState);
    }

    setState((ps) => ({ ...ps, ...updatedState }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    calculate();
  };

  const calculate = (updatedState?: State) => {
    const { percentage, trades, initialMoneyTraded, reinvestGains } =
      updatedState ?? state;

    const _trades = +trades;
    const _percentage = +percentage;
    const _initialMoneyTraded = +initialMoneyTraded;

    if (
      !percentage ||
      !trades ||
      !initialMoneyTraded ||
      isNaN(_trades) ||
      isNaN(_percentage) ||
      isNaN(_initialMoneyTraded)
    )
      return;

    const results: Result[] = [];

    for (let i = 0; i < (_trades || 10); i++) {
      const moneyTraded = reinvestGains
        ? results[i - 1]?.profit + results[i - 1]?.moneyTraded || _initialMoneyTraded
        : _initialMoneyTraded;
      const trade = i + 1;
      const profit = +(moneyTraded * (_percentage / 100));
      const netTotalGain = +(results[i - 1]?.netTotalGain + profit || profit);
      const balance = reinvestGains
        ? +(moneyTraded + profit)
        : +(moneyTraded + netTotalGain);

      results.push({
        trade,
        moneyTraded: +moneyTraded.toFixed(2),
        percentage: +_percentage.toFixed(2),
        profit: +profit.toFixed(2),
        netTotalGain: +netTotalGain.toFixed(2),
        balance: +balance.toFixed(2),
      });
    }

    setState((ps) => ({ ...ps, ...(updatedState ?? state), results }));
  };

  const onReset = () => {
    setState({
      percentage: '',
      trades: '',
      initialMoneyTraded: '',
      reinvestGains: false,
      results: [],
    });
  };

  return (
    <main className={classes.container}>
      <form className={classes.head} onSubmit={onSubmit} onReset={onReset}>
        <div className={classes.inputs}>
          <div>
            <label htmlFor="initialMoneyTraded">Money traded</label>
            <input
              type="number"
              placeholder="Initial money traded"
              id="initialMoneyTraded"
              name="initialMoneyTraded"
              min={0}
              value={state.initialMoneyTraded}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="percentage">Percentage/trade</label>
            <input
              type="number"
              placeholder="Win percentage per trade"
              step="0.01"
              id="percentage"
              name="percentage"
              min={0}
              value={state.percentage}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="trades">Number of trades</label>
            <input
              placeholder="Number of trades"
              type="number"
              id="trades"
              name="trades"
              min={1}
              value={state.trades}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className={classes.reinvest}>
          <input
            disabled={!state.percentage || !state.trades || !state.initialMoneyTraded}
            type="checkbox"
            data-checkmark="&#10003;"
            id="reinvestGains"
            name="reinvestGains"
            checked={state.reinvestGains}
            onChange={onInputChange}
          />
          <label htmlFor="reinvestGains">Reinvest gains</label>
        </div>
        <div className={classes['button--container']}>
          <button className={classes['reset--btn']} type="reset">
            Reset
          </button>
          <button
            disabled={!state.percentage || !state.trades || !state.initialMoneyTraded}
            className={classes['calculate--btn']}
            type="submit">
            Calculate
          </button>
        </div>
      </form>
      <div
        className={`${classes.content} ${
          state.results.length ? '' : classes.content__empty
        }`}>
        {state.results.length ? (
          <table>
            <thead>
              <tr>
                <th>Trade</th>
                <th>Money traded</th>
                <th>Percentage/trade</th>
                <th>Profit</th>
                <th>Net total gain</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {state.results.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.trade}</td>
                  <td>{trade.moneyTraded}</td>
                  <td>{trade.percentage}</td>
                  <td>{trade.profit}</td>
                  <td>{trade.netTotalGain}</td>
                  <td>{trade.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={classes.empty}>
            <p>Enter the values and click on calculate</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Projector;
