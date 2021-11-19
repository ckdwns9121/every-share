import styles from './RealtyList.module.scss';

function OptionItem({ src, name }: { src: string; name: string }) {
  return (
    <li className={styles['option-item']}>
      <div className={styles['option-img']}>
        <img src={src} alt={name} />
      </div>
      <div className={styles['option-name']}>{name}</div>
    </li>
  );
}
export default OptionItem;
