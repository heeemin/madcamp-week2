import { useState } from 'react'
const TagsInput = props => {
  const [tags, setTags] = useState([
    'music',
    'movie/drama',
    'sport',
    'fashion',
    'game',
    'cook',
    'pet',
  ])
  const [select, setSelect] = useState([])

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }
  const handle = tag => {
    setSelect([...select, tag])
    console.log(select)
  }
  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div className="tag-item">
          {/* One hardcoded tag for test */}
          <button className="text" onClick={handle}>
            {tag}
          </button>
        </div>
      ))}
      <button onClick={() => props.setTag(select)}>send data to parent</button>
    </div>
  )
}

export default TagsInput
