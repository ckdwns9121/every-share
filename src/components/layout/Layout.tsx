import React from "react";
import styles from "./Layout.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export interface LayoutProps {
  children: React.ReactNode;
  none? : boolean
}

function Layout({ children ,none}: LayoutProps) {
  return (
    <div className={cx('container',none)}>
      <div className={styles["content"]}>{children}</div>
    </div>
  );
}

export default Layout;
