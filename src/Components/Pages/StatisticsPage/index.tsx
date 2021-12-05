import {CSSProperties} from "@material-ui/core/styles/withStyles";
import {toast} from "react-toastify";
import Loading from "../../Loading/Loading";
import {VictoryPie} from "victory"
import useTextCounts from "../../../Hooks/useTextCounts";
import useVictoryTheme from "../../../Hooks/useVictoryTheme";

const styles: { container: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
}

const StatisticsPage = () => {
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


  return <div style={styles.container}>
    <div>Texts</div>
    <div>
      <VictoryPie
        innerRadius={50}
        theme={theme}
        data={pieData}/>
    </div>
  </div>
}

export default StatisticsPage;
