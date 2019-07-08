import React from 'react';

// class WeatherApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cityName: props.cityName,
//       data: props.data,
//       isLoading: props.isLoading,
//     };
//   }

//   renderData() {
//     const { data } = this.state;
//     return (
//       <div>
//         <label htmlFor="tem">Temperature</label>
//         <div id="tem">{data.current.temp_c}</div>
//         <label htmlFor="condText">Condition</label>
//         <div id="condText">{data.current.condition.text}</div>
//         <img src={data.current.condition.icon} alt="" />
//       </div>
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         {this.state.isLoading && <div>Loading...</div>}
//         {this.state.data && this.renderData()}
//       </div>
//     );
//   }
// }

function WeatherApp({ data, isLoading }) {
  const renderData = () => (
    <ul>
      <li role="separator" className="divider" />
      <li><h4><label htmlFor="tem">Temperature</label></h4></li>
      <li><div id="tem">{data.current.temp_c} ℃</div></li>
      <li role="separator" className="divider" />
      <li style={{ display: 'flex' }}>
        <span style={{ flex: 1 }}>
          <h4><label htmlFor="condText">Condition</label></h4>
          <div id="condText">{data.current.condition.text}</div>
        </span>
        <span style={{ marginTop: '8px' }}><img src={data.current.condition.icon} alt="" /></span>
      </li>
      <li role="separator" className="divider" />
    </ul>
  );

  return (
    <div className="weatherContainer">
      {isLoading && <div>Loading...</div>}
      {!!data && renderData()}
    </div>
  );
}

export default WeatherApp;
