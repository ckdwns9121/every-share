import styles from './Empty.module.scss';

function Empty(){
    return(
        <div className={styles['empty']}>
       <svg width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <clipPath id="clipPath">
            <rect width="80" height="80" transform="translate(161 603)" fill="#fff" stroke="#707070" strokeWidth="1"/>
          </clipPath>
        </defs>
        <g  transform="translate(-161 -603)" clipPath="url(#clip-path)">
          <g id="blank" transform="translate(161 603)">
            <g  transform="translate(10 17.1)">
              <g >
                <path  d="M62.827,11.168h0c-.012-.03-.024-.058-.038-.087a.759.759,0,0,0-.039-.089L56.46.508a1.048,1.048,0,0,0-.9-.508H7.338a1.048,1.048,0,0,0-.9.508L.15,10.992a.757.757,0,0,0-.039.089c-.014.028-.026.057-.038.087A1.061,1.061,0,0,0,0,11.532v50.32A1.048,1.048,0,0,0,1.048,62.9h60.8A1.048,1.048,0,0,0,62.9,61.852V11.532A1.061,1.061,0,0,0,62.827,11.168ZM55.562,3.086,60,10.483H55.562ZM9.435,2.1h44.03v8.387H9.435Zm-2.1.99v7.4H2.9ZM60.8,60.8H2.1V12.58H60.8Z" fill="#222" stroke="#707070" strokeWidth="0.167"/>
                <path  d="M31.145,27.623h12.58a3.145,3.145,0,0,0,0-6.29H31.145a3.145,3.145,0,0,0,0,6.29Zm0-4.193h12.58a1.048,1.048,0,1,1,0,2.1H31.145a1.048,1.048,0,0,1,0-2.1Z" transform="translate(-5.985 -4.56)" fill="#222" stroke="#707070" strokeWidth="0.167"/>
              </g>
            </g>
            <line  y2="8" transform="translate(41.5 0.5)" fill="none" stroke="#222" strokeWidth="2"/>
            <line y1="8" transform="translate(33.5 9.963) rotate(150)" fill="none" stroke="#222" strokeWidth="2"/>
            <line  y2="8" transform="translate(53.5 3.035) rotate(30)" fill="none" stroke="#222" strokeWidth="2"/>
          </g>
        </g>
      </svg>
    </div>
 
      
    )
}

export default Empty;