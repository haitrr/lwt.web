import {CSSProperties} from "@material-ui/core/styles/withStyles";
import TextCountChart from "./TextCountChart";
import TermCountChart from "./TermCountChart";

const styles: { container: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
}

const StatisticsPage = () => {
  return <div style={styles.container}>
    <div>Texts</div>
    <div>
      <TextCountChart/>
    </div>
    <div>Terms</div>
    <div>
      <TermCountChart/>
    </div>
  </div>
}

export default StatisticsPage;