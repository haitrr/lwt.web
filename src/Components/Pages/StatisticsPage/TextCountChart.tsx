import {VictoryPie} from "victory";
import useTextCounts from "../../../Hooks/useTextCounts";
import useVictoryTheme from "../../../Hooks/useVictoryTheme";
import Loading from "../../Loading/Loading";
import {toast} from "react-toastify";
import React from "react";

const TextCountChart: React.VFC = () => {
  const {isLoading, error, data} = useTextCounts();
  const theme = useVictoryTheme();
  if (isLoading || !data) {
    return <Loading/>
  }
  if (error) {
    toast.error("failed to load text counts")
    return <div>Error</div>
  }
  const pieData = data.map(tc => {
    return {x: `${tc.languageName}: ${tc.count}`, y: tc.count}
  })

  return <VictoryPie
    innerRadius={50}
    theme={theme}
    data={pieData}/>
}

export default TextCountChart;
