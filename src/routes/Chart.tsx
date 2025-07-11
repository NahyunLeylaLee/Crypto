import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';

interface ChartProps {
    isDark: boolean;
}
interface IHistorical {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ isDark }: ChartProps) {
    const { state } = useLocation();
    const coinId = state as string;
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return (
        <div>{isLoading ? (
            "Loading chart..."
        ) : (
            <ApexChart
                type="candlestick"
                series={[
                    {
                        data:
                            data?.map(d => {
                                return {
                                    x: new Date(d.time_close),
                                    y: [d.open, d.high, d.low, d.close]
                                }
                            }) ?? []
                    },
                ]}
                options={{
                    theme: {
                        mode: isDark ? "dark" : "light"
                    },
                    chart: {
                        type: 'candlestick',
                        height: 350,
                        toolbar: {
                            show: false
                        },
                    },
                    title: {
                        align: 'left'
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    yaxis: {
                        tooltip: {
                            enabled: true
                        }
                    }
                }}
            >

            </ApexChart>
        )
        }</div >
    );
}

export default Chart;