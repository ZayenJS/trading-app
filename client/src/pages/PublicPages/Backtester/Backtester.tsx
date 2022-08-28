import { ChangeEvent, FC, FormEvent, useMemo, useState } from 'react';
import { AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';
import CustomTooltip from '../../../components/CustomTooltip/CustomTooltip';
import Modal from '../../../components/Modal/Modal';
import Portal from '../../../components/Portal/Portal';

import classes from './Backtester.module.scss';

export interface ChartData {
  name: number;
  value: number;
  type: 'profit' | 'loss' | 'initial';
  percentage?: number;
  diff?: number;
}

export interface BacktesterProps {}
export interface BacktesterState {
  initial: string;
  profit: string;
  loss: string;
  accumulatedValue: string;
  data: ChartData[];
  resetModalVisible: boolean;
  saveModalVisible: boolean;
  errorMessage: string;
  errorMessageVisible: boolean;
}

const Backtester: FC<BacktesterProps> = () => {
  const [state, setState] = useState<BacktesterState>({
    initial: '',
    profit: '',
    loss: '',
    accumulatedValue: '',
    data: [],
    resetModalVisible: false,
    saveModalVisible: false,
    errorMessage: '',
    errorMessageVisible: false,
  });

  const onSaveStrategyBtnClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.data.length)
      return setState({
        ...state,
        errorMessage: 'There is no data to save, please add at least one trade',
        errorMessageVisible: true,
      });

    setState({
      ...state,
      saveModalVisible: true,
    });
  };

  const onSaveStrategy = () => {
    console.log('Saving strategy...');
  };

  const onResetButtonClick = () => {
    if (!state.data.length)
      return setState({
        ...state,
        errorMessage: 'There is no data to reset',
        errorMessageVisible: true,
      });

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
      saveModalVisible: false,
      errorMessage: '',
      errorMessageVisible: false,
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
        errorMessage: '',
        errorMessageVisible: false,
      };
    }

    setState((prevState) => ({ ...prevState, ...updatedState }));
  };

  const onSetInitial = (event: FormEvent) => {
    event.preventDefault();

    if (!state.initial)
      return setState((prevState) => ({
        ...prevState,
        errorMessage: 'Please enter an initial value',
        errorMessageVisible: true,
      }));

    setState((prevState) => ({
      ...prevState,
      accumulatedValue: prevState.initial,
      errorMessage: '',
      errorMessageVisible: false,
      data: [
        {
          name: 0,
          value: +state.initial,
          type: 'initial',
        },
      ],
    }));
  };

  const onAddProfit = (event: FormEvent) => {
    event.preventDefault();

    if (!state.profit)
      return setState((prevState) => ({
        ...prevState,
        errorMessage: 'Please enter a profit value',
        errorMessageVisible: true,
      }));
    if (!state.data.length)
      return setState((prevState) => ({
        ...prevState,
        errorMessage: 'Please set an initial value',
        errorMessageVisible: true,
      }));

    setState((prevState) => ({
      ...prevState,
      accumulatedValue: `${+prevState.accumulatedValue * (1 + +prevState.profit / 100)}`,
      errorMessage: '',
      errorMessageVisible: false,
      data: [
        ...prevState.data,
        {
          name: prevState.data.length,
          value: +prevState.accumulatedValue * (1 + +prevState.profit / 100),
          type: 'profit',
          percentage: +prevState.profit,
          diff: +prevState.accumulatedValue * (+prevState.profit / 100),
        },
      ],
    }));
  };

  const onAddLoss = (event: FormEvent) => {
    event.preventDefault();

    if (!state.loss)
      return setState((prevState) => ({
        ...prevState,
        errorMessage: 'Please enter a loss value',
        errorMessageVisible: true,
      }));
    if (!state.data.length)
      return setState((prevState) => ({
        ...prevState,
        errorMessage: 'Please set an initial value',
        errorMessageVisible: true,
      }));

    setState((prevState) => ({
      ...prevState,
      accumulatedValue: +prevState.accumulatedValue * (1 - +prevState.loss / 100) + '',
      errorMessage: '',
      errorMessageVisible: false,
      data: [
        ...prevState.data,
        {
          name: prevState.data.length,
          value: +prevState.accumulatedValue * (1 - +prevState.loss / 100),
          type: 'loss',
          percentage: -prevState.loss,
          diff: +prevState.accumulatedValue * (+prevState.loss / 100),
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

  const averageWinningPercentage = useMemo(() => {
    const winningTrades = state.data.filter((d) => d.type === 'profit').map((d) => d.percentage!);

    if (!winningTrades.length) {
      return '-';
    }

    const averageWinningPercentage = winningTrades.reduce((a, b) => a + b, 0) / winningTrades.length;

    return `${averageWinningPercentage.toFixed(2)}%`;
  }, [state.data]);

  const averageLosingPercentage = useMemo(() => {
    const losingTrades = state.data.filter((d) => d.type === 'loss').map((d) => d.percentage!);

    if (!losingTrades.length) {
      return '-';
    }

    const averageLosingPercentage = losingTrades.reduce((a, b) => a + b, 0) / losingTrades.length;

    return `${averageLosingPercentage.toFixed(2)}%`;
  }, [state.data]);

  const PnL = useMemo(() => {
    const accumulatedValue = state.accumulatedValue ? +state.accumulatedValue : 0;
    const initialValue = state.initial ? +state.initial : 0;

    if (state.data.length <= 1)
      return {
        str: '-',
        num: null,
      };

    const percentage = ((accumulatedValue - initialValue) / initialValue) * 100;

    return {
      str: `${percentage.toFixed(2)}%`,
      num: percentage,
    };
  }, [state.data, state.accumulatedValue, state.initial]);

  return (
    <>
      <div className={classes.Container}>
        <header>
          <div className={classes.Inputs}>
            <form onSubmit={onSetInitial}>
              <input
                placeholder="Initial amount"
                name="initial"
                onChange={onInputChange}
                value={state.initial}
                type="number"
                min="1"
                step="0.01"
              />
              <button className={classes.Btn__Main}>Set initial</button>
            </form>
            <form onSubmit={onAddProfit}>
              <input
                placeholder="Profit made (%)"
                name="profit"
                onChange={onInputChange}
                value={state.profit}
                type="number"
                step="0.01"
              />
              <button className={classes.Btn__Profit}>+ Add profit</button>
            </form>
            <form onSubmit={onAddLoss}>
              <input
                placeholder="Loss (%)"
                name="loss"
                onChange={onInputChange}
                value={state.loss}
                type="number"
                step="0.01"
              />
              <button className={classes.Btn__Loss}>- Add loss</button>
            </form>
          </div>

          <div className={classes.Outputs}>
            <div>
              <span>Winrate</span>
              <span>{winRate}</span>
            </div>
            <div>
              <span>PnL</span>
              <span className={PnL.num !== null ? (PnL.num! > 0 ? classes.PnL__Positive : classes.PnL__Negative) : ''}>
                {PnL.str}
              </span>
            </div>
            <div>
              <span>Total Trades</span>
              <span>{totalTrades}</span>
            </div>
            <div>
              <span>Wins / Losses</span>
              <span>{winsAndsLosses}</span>
            </div>
            <div>
              <span>Average profit/trade</span>
              <span>{averageWinningPercentage}</span>
            </div>
            <div>
              <span>Average loss/trade</span>
              <span>{averageLosingPercentage}</span>
            </div>
          </div>

          <form onSubmit={onSaveStrategyBtnClick} className={classes.Actions}>
            <button className={classes.Btn__Main}>Save</button>
            <button type="button" onClick={onResetButtonClick} className={classes.Btn__Reset}>
              Reset
            </button>
          </form>
        </header>
        <main>
          {state.data.length ? (
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
          ) : (
            <div className={classes.NoData}>There is no data to show. Add some trades.</div>
          )}
        </main>
      </div>

      <Portal animate animationDuration={200} mount={!!state.errorMessageVisible}>
        <Modal
          type="error"
          text={state.errorMessage}
          onCancel={() => setState((ps) => ({ ...ps, errorMessageVisible: false }))}
          clickOutside
        />
      </Portal>

      <Portal animate animationDuration={200} mount={state.resetModalVisible}>
        <Modal
          type="reset-chart"
          text="Are you sure you want to reset the chart? (the chart will be completely blank and you will lose all your data)"
          onConfirm={onResetChart}
          onCancel={() => setState((ps) => ({ ...ps, resetModalVisible: false }))}
          clickOutside
          withButtons
        />
      </Portal>

      <Portal animate animationDuration={200} mount={state.saveModalVisible}>
        <Modal
          title="Saving strategy"
          type="save-strategy"
          onConfirm={onSaveStrategy}
          onCancel={() => setState((ps) => ({ ...ps, saveModalVisible: false }))}
          clickOutside
          withButtons
        />
      </Portal>
    </>
  );
};

export default Backtester;
