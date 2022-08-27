import { ChangeEvent, FC, FormEvent, MouseEvent, useMemo, useState } from 'react';
import { AreaChart, XAxis, YAxis, Tooltip, Area, Line, LineChart } from 'recharts';

import classes from './Backtester.module.scss';

export interface BacktesterProps {}
export interface BacktesterState {
  initial: number;
  profit: number;
  loss: number;
  accumulatedValue: number;
  data: any;
}

const Backtester: FC<BacktesterProps> = () => {
  const [state, setState] = useState<BacktesterState>({
    initial: 0,
    profit: 0,
    loss: 0,
    accumulatedValue: 0,
    data: [],
  });

  const onActionSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // open modal to save backtest
  };

  const onResetButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('reset');

    // reset form
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    let updatedState = {
      ...state,
      [target.name]: +target.value,
    };

    if (target.name === 'initial') {
      updatedState = {
        ...updatedState,
        profit: 0,
        loss: 0,
        initial: +target.value,
        accumulatedValue: +target.value,
        data: [],
      };
    }

    setState((prevState) => ({ ...prevState, ...updatedState }));
  };

  const onAddProfit = () => {
    setState((prevState) => ({
      ...prevState,
      profit: +prevState.profit + 1,
      accumulatedValue: +prevState.accumulatedValue * (1 + 0.025),
      data: [...prevState.data, { value: +prevState.accumulatedValue * (1 + 0.025) }],
    }));
  };

  const onAddLoss = () => {
    setState((prevState) => ({
      ...prevState,
      loss: +prevState.loss + 1,
      accumulatedValue: +prevState.accumulatedValue * (1 - 0.025),
      data: [...prevState.data, { value: +prevState.accumulatedValue * (1 - 0.025) }],
    }));
  };

  const winRate = useMemo(() => {
    const profit = state.profit;
    const loss = state.loss;

    if (profit === 0 && loss === 0) {
      return '-';
    }

    const winRate = (profit / (profit + loss)) * 100;

    return `${winRate.toFixed(2)}%`;
  }, [state.profit, state.loss]);

  return (
    <div className={classes.Container}>
      <header>
        <form onSubmit={onActionSubmit} className={classes.Actions}>
          <button className={classes.Btn__Main}>Save</button>
          <button type="button" onClick={onResetButtonClick} className={classes.Btn__Reset}>
            Reset
          </button>
        </form>
        <div className={classes.Inputs}>
          <div>
            <input name="initial" onChange={onInputChange} value={state.initial} type="number" min="1" step="0.01" />
            <button type="button" className={classes.Btn__Main}>
              Set initial
            </button>
          </div>
          <div>
            <input name="profit" onChange={onInputChange} value={state.profit} type="number" min="0" step="1" />
            <button onClick={onAddProfit} className={classes.Btn__Profit}>
              + Add profit
            </button>
          </div>
          <div>
            <input name="loss" onChange={onInputChange} value={state.loss} type="number" min="0" step="1" />
            <button onClick={onAddLoss} className={classes.Btn__Loss}>
              - Add loss
            </button>
          </div>
        </div>
        <div className={classes.Outputs}>
          <div>
            <span>Winrate</span>
            <span>{winRate}</span>
          </div>
          <div>
            <span>Total Trades</span>
            <span>{state.profit + state.loss}</span>
          </div>
          <div>
            <span>Wins / Losses</span>
            <span>
              {state.profit}W / {state.loss}L
            </span>
          </div>
        </div>
      </header>
      <main>
        <div className={classes.Chart}>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <AreaChart
            width={500}
            height={400}
            data={state.data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" fill="url(#colorUv)" />
          </AreaChart>
          {/* </ResponsiveContainer> */}
        </div>
      </main>
    </div>
  );
};

export default Backtester;
