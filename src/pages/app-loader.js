import { Loader } from 'rsuite'

function AppLoader() {
  const styles = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3c4b64',
    color: '#fff',
  }

  return (
    <div style={styles}>
      <Loader size="md" content="Medium" />
    </div>
  )
}

export default AppLoader