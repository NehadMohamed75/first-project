import { backgroundColor } from '../configs/colors'

const Wrapper = ({ children }) => {
  return (
    <div style={{
        background: backgroundColor,
        height: '100vh',
        width: '100vw'
    }}>
        {children}
    </div>
  )
}

export default Wrapper