import ClipLoader from 'react-spinners/ClipLoader'

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}

function Loading() {
  return (
    <div className='sweet-loading'>
      <ClipLoader
        color='#555555'
        loading={true}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}

export default Loading
