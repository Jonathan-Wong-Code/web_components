import * as React from 'react';

function SvgPineapple(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M256 502c-69.196 0-125.29-56.094-125.29-125.29v-93.42C130.71 214.094 186.804 158 256 158s125.29 56.094 125.29 125.29v93.42C381.29 445.906 325.196 502 256 502z"
        fill="#fff2a0"
      />
      <g fill="#89df8f">
        <path d="M346.3 48.04c-4.64 10.05-15.55 33.91-27.7 62.31-9.08 3.91-18.23 8.69-27.07 14.53-.94.62-1.87 1.25-2.77 1.87l-11.17-39.04c.81-.56 1.62-1.11 2.43-1.66 24.67-16.58 60.72-35.16 66.28-38.01zM233.33 86.96L222.15 126c-.55-.37-1.11-.75-1.68-1.12-8.84-5.84-17.99-10.62-27.07-14.53-12.15-28.4-23.06-52.26-27.7-62.31 5.56 2.85 41.61 21.43 66.28 38.01.45.3.9.61 1.35.91z" />
        <path d="M288.76 126.75c-15.77 10.89-26.1 22.27-32.76 31.25-6.81-9.19-17.47-20.89-33.85-32l11.18-39.04L255.35 10l22.24 77.71z" />
      </g>
      <path
        d="M256 158c-23.87 0-46.17 6.67-65.16 18.26-1.12-6.69-3.16-13.98-6.62-21.62-16.36-36.23-53.2-55.66-66.58-62.04 18.5 1.3 63.64 6.42 102.83 32.28C237.81 136.32 248.96 148.5 256 158zm138.36-65.4c-13.38 6.38-50.22 25.81-66.58 62.04-3.46 7.64-5.5 14.93-6.62 21.62C302.17 164.67 279.87 158 256 158c7.04-9.5 18.19-21.68 35.53-33.12 39.19-25.86 84.33-30.98 102.83-32.28z"
        fill="#b8ecbc"
      />
      <path d="M404.03 90.053a10.007 10.007 0 00-10.371-7.429c-15.849 1.114-35.741 3.911-56.593 10.284a2485.155 2485.155 0 0118.312-40.677 10.001 10.001 0 00-13.641-13.091c-8.561 4.389-35.584 18.472-58.274 32.754l-18.5-64.647a9.999 9.999 0 00-19.227.002l-18.304 63.953c-22.434-14.03-48.744-27.742-57.17-32.061a10 10 0 00-13.641 13.091 2483.186 2483.186 0 0118.313 40.677c-20.852-6.373-40.744-9.17-56.593-10.284-4.791-.341-9.147 2.783-10.371 7.429s1.03 9.505 5.366 11.573c17.121 8.163 47.913 26.441 61.775 57.139a78.358 78.358 0 014.535 12.902c-35.561 24.402-58.936 65.331-58.936 111.623v93.42C120.71 451.309 181.401 512 256 512s135.29-60.691 135.29-135.29v-93.42c0-46.294-23.378-87.226-58.943-111.627.21-.823.43-1.642.667-2.455 1.546-5.302-1.499-10.853-6.8-12.4-4.527-1.32-9.222.711-11.465 4.627a134.211 134.211 0 00-38.098-11.861c6.063-5.917 12.869-11.388 20.387-16.348 23.496-15.504 49.831-23.312 71.138-27.232.177.391.38.775.612 1.15 2.903 4.699 9.067 6.154 13.763 3.252a169.937 169.937 0 0116.112-8.77 9.998 9.998 0 005.367-11.573zm-79.012-19.319a2490.452 2490.452 0 00-14.041 32.024 189.147 189.147 0 00-16.273 8.413l-5.496-19.206c11.244-7.323 24.427-14.933 35.81-21.231zm-69.667-24.385l21.867 76.415c-7.852 5.946-14.947 12.442-21.218 19.44-6.555-7.316-14.012-14.083-22.291-20.245zM256 168c7.588 0 15.005.745 22.187 2.151L256 192.339l-22.187-22.189A115.471 115.471 0 01256 168zm-69.018-97.265c11.008 6.09 23.708 13.411 34.711 20.517l-5.516 19.272a189.777 189.777 0 00-15.154-7.765 2456.837 2456.837 0 00-14.041-32.024zm6.352 79.789c-7.405-16.399-18.616-29.693-30.495-40.209 16.896 4.606 35.242 11.772 52.124 22.912 7.519 4.961 14.339 10.427 20.405 16.344a134.2 134.2 0 00-37.894 11.755 99.087 99.087 0 00-4.14-10.802zm18.744 26.177l29.78 29.781-48.505 48.508-34.193-34.193c12.678-19.578 31.126-35.083 52.918-44.096zM371.29 283.29v24.347l-38.501-38.503 29.79-29.79c5.608 13.551 8.711 28.392 8.711 43.946zm-4.142 48.49l-48.503 48.503-48.503-48.503 48.504-48.504zm-222.296 0l48.501-48.504 48.508 48.508-48.501 48.504zm4.569-92.436l29.79 29.79-38.501 38.503V283.29c0-15.554 3.103-30.395 8.711-43.946zM256 345.922l48.503 48.503L256 442.927l-48.503-48.503zm.003-28.281l-48.508-48.508L256 220.625l48.506 48.509zM140.71 355.922l38.507 38.507-28.728 28.722c-6.282-14.216-9.779-29.927-9.779-46.441zm19.868 85.422l32.777-32.777 48.503 48.503-27.243 27.243c-22.088-8.524-40.914-23.658-54.037-42.969zm76.24 49.051l19.183-19.181 19.181 19.181A115.52 115.52 0 01256 492c-6.534 0-12.941-.555-19.182-1.605zm60.568-6.082l-27.241-27.241 48.505-48.5 32.772 32.772c-13.123 19.311-31.949 34.445-54.036 42.969zm64.126-61.163l-28.72-28.72 38.498-38.505v20.785c0 16.514-3.497 32.224-9.778 46.44zm-8.672-202.352l-34.192 34.194-48.506-48.509 29.78-29.781c21.792 9.012 40.24 24.517 52.918 44.096z" />
      <circle cx={344.211} cy={129.391} r={10} />
    </svg>
  );
}

export default SvgPineapple;