import { ChangeEvent, FC, FormEvent, useMemo, useState } from 'react';
import { AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../../../components/CustomTooltip/CustomTooltip';
import Modal from '../../../components/Modal/Modal';
import Portal from '../../../components/Portal/Portal';

import classes from './Backtester.module.scss';

export interface BacktesterProps {}
export interface BacktesterState {
  initial: string;
  profit: string;
  loss: string;
  accumulatedValue: string;
  data: {
    name: number;
    value: number;
    type: 'profit' | 'loss' | 'initial';
    percentage?: number;
    diff?: number;
  }[];
  resetModalVisible: boolean;
}

const Backtester: FC<BacktesterProps> = () => {
  const [state, setState] = useState<BacktesterState>({
    initial: '',
    profit: '',
    loss: '',
    accumulatedValue: '',
    data: [],
    resetModalVisible: false,
  });

  const onActionSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // open modal to save backtest
  };

  const onResetButtonClick = () => {
    setState((prevState) => ({
      ...prevState,
      resetModalVisible: true,
    }));
  };

  const onResetChart = () => {
    setState({
      initial: '',
      profit: '',
      loss: '',
      accumulatedValue: '',
      data: [],
      resetModalVisible: false,
    });
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
        profit: '',
        loss: '',
        initial: target.value,
        accumulatedValue: target.value,
        data: [],
      };
    }

    setState((prevState) => ({ ...prevState, ...updatedState }));
  };

  const onSetInitial = () => {
    if (!state.initial) return alert('Please enter an initial value');

    setState((prevState) => ({
      ...prevState,
      accumulatedValue: prevState.initial,
      data: [
        {
          name: 0,
          value: +state.initial,
          type: 'initial',
        },
      ],
    }));
  };

  const onAddProfit = () => {
    if (state.profit && state.loss) {
      setState((prevState) => ({
        ...prevState,
        accumulatedValue: (+prevState.accumulatedValue * (1 + +prevState.profit / 100)).toFixed(2),
        data: [
          ...prevState.data,
          {
            name: prevState.data.length,
            value: +(+prevState.accumulatedValue * (1 + +prevState.profit / 100)).toFixed(2),
            type: 'profit',
            percentage: +prevState.profit,
            diff: +(+prevState.accumulatedValue * (+prevState.profit / 100)).toFixed(2),
          },
        ],
      }));
    }
  };

  const onAddLoss = () => {
    setState((prevState) => ({
      ...prevState,
      accumulatedValue: (+prevState.accumulatedValue * (1 - +prevState.loss / 100)).toFixed(2),
      data: [
        ...prevState.data,
        {
          name: prevState.data.length,
          value: +(+prevState.accumulatedValue * (1 - +prevState.loss / 100)).toFixed(2),
          type: 'loss',
          percentage: -prevState.loss,
          diff: +(+prevState.accumulatedValue * (+prevState.loss / 100)).toFixed(2),
        },
      ],
    }));
  };

  const winRate = useMemo(() => {
    const winningTrades = state.data.filter((d) => d.type === 'profit').length;
    const losingTrades = state.data.filter((d) => d.type === 'loss').length;

    if (winningTrades === 0 && losingTrades === 0) {
      return '-';
    }

    const winRate = (winningTrades / (winningTrades + losingTrades)) * 100;

    return `${winRate.toFixed(2)}%`;
  }, [state.data]);

  const winsAndsLosses = useMemo(() => {
    const winningTrades = state.data.filter((d) => d.type === 'profit').length;
    const losingTrades = state.data.filter((d) => d.type === 'loss').length;

    if (winningTrades === 0 && losingTrades === 0) {
      return '-';
    }

    return `${winningTrades}W / ${losingTrades}L`;
  }, [state.data]);

  const totalTrades = useMemo(() => {
    const winningTrades = state.data.filter((d) => d.type === 'profit').length;
    const losingTrades = state.data.filter((d) => d.type === 'loss').length;

    return winningTrades + losingTrades;
  }, [state.data]);

  return (
    <>
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
              <button onClick={onSetInitial} type="button" className={classes.Btn__Main}>
                Set initial
              </button>
            </div>
            <div>
              <input name="profit" onChange={onInputChange} value={state.profit} type="number" step="0.01" />
              <button onClick={onAddProfit} className={classes.Btn__Profit}>
                + Add profit
              </button>
            </div>
            <div>
              <input name="loss" onChange={onInputChange} value={state.loss} type="number" step="0.01" />
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
              <span>{totalTrades}</span>
            </div>
            <div>
              <span>Wins / Losses</span>
              <span>{winsAndsLosses}</span>
            </div>
          </div>
        </header>
        <main>
          <div className={classes.Chart}>
            <ResponsiveContainer width="100%" height="100%">
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
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#356295" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
      <Portal animate animationDuration={200} mount={state.resetModalVisible}>
        <Modal
          text="Are you sure you want to reset? (the chart will be complete blank and you will lose all your data)"
          onConfirm={onResetChart}
          onCancel={() => setState((ps) => ({ ...ps, resetModalVisible: false }))}
          clickOutside
        />
      </Portal>
    </>
  );
};

export default Backtester;
