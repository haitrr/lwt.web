import {VictoryPie} from "victory";
import useVictoryTheme from "../../../Hooks/useVictoryTheme";
import Loading from "../../Loading/Loading";
import {toast} from "react-toastify";
import React from "react";
import useTermCounts from "../../../Hooks/useTermCounts";

const TermCountChart: React.VFC = () => {
  const {isLoading, error, data} = useTermCounts();
  const theme = useVictoryTheme();
  if (isLoading || !data) {
    return <Loading/>
  }
  if (error) {
    toast.error("failed to load term counts")
    return <div>Error</div>
  }
  const pieData = data.map(tc => {
    return {label: `${tc.languageName}\n ${tc.count}`, y: tc.count}
  })

  return <VictoryPie
    width={400}
    height={400}
    padding={100}
    innerRadius={50}
    theme={theme}
    data={pieData}/>
}

export default TermCountChart;
