import { useLocation } from "react-router-dom";
import styled from "styled-components";

const PriceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const PriceBox = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  p {
    padding-top: 5px;
    font-size: 15px;
  }
  img {
    width: 50px;
    height: 50px;
  }
`;

const PriceDetail = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-around;
`;

interface PriceProps {
    isDark: boolean;
}

function Price({isDark}: PriceProps) {
  const { state } = useLocation();
  const data = state;

  const display = [
    { name: '6h', value: data?.quotes.USD.percent_change_6h },
    { name: '12h', value: data?.quotes.USD.percent_change_12h },
    { name: '1d', value: data?.quotes.USD.percent_change_24h },
    { name: '7d', value: data?.quotes.USD.percent_change_7d },
    { name: '30d', value: data?.quotes.USD.percent_change_30d },
    { name: '1y', value: data?.quotes.USD.percent_change_1y },
  ]
  return (
    <PriceWrapper>
      {display.map(item => 
        <PriceBox>
        <p>{item.name} %</p>
        <PriceDetail>
          <span>{item.value}%</span>
          <img src={item.value > 0 ? "/img/increase.png" : "/img/decrease.png"} />
        </PriceDetail>
      </PriceBox>
      )}
    </PriceWrapper>
  );
}

export default Price;