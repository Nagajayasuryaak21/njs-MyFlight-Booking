import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";

const MapChart = (props) => {
  return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{
        rotate: [-82, 0, 0],
        center: [0, 22],
        scale: 150,
      }}
      className="w-[50vw] xl:flex hidden"
    >
      <Geographies
        geography="/features.json"
        fill="#0d2517"
        stroke="#00FF00"
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {props.from.name.common !="" ? (
        <Annotation
          subject={[props.from.latlng[1]||2.56,props.from.latlng[0]||48.25]}
          dx={-40}
          dy={-30}
          connectorProps={{
            stroke: "#00FF00",
            strokeWidth: 3,
            strokeLinecap: "round",
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#00FF00">
            {props.from.name.common}
          </text>
        </Annotation>
      ) : (
        <div></div>
      )}
      
      {props.to.name.common != "" ? (
        <Annotation
          subject={[props.to.latlng[1]||2.56,props.to.latlng[0]||48.25]}
          dx={-40}
          dy={-30}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round",
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {props.to.name.common}
          </text>
        </Annotation>
      ) : (
        <div></div>
      )}
      
    </ComposableMap>
  );
};

export default MapChart;
