interface Props{
    white? : boolean
}

function Arrow({white} : Props) {
  return (
    <svg
      width="21.567"
      height="18.829"
      viewBox="0 0 21.567 18.829"
    >
      <g
        transform="translate(-23.5 -54.586)"
      >
        <path

          d="M-1211.826-2860.78l-8,8.014,8,7.986"
          transform="translate(1244.326 2916.78)"
          fill="none"
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path

          d="M909.5,64h19.567"
          transform="translate(-885)"
          fill="none"
          stroke="#333"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
Arrow.defaultProps={
    white : false,
}
export default Arrow;