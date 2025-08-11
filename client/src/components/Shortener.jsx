import { useState, useEffect } from "react"
import Notification from "./Notification"

const apiUrl = process.env.REACT_APP_API_URL

export default function Shortener() {
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState(null)
    const [urls, setUrls] = useState([])
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        fetchUrls()
    }, [])

    const fetchUrls = async () => {
        try {
            const response = await fetch(`${apiUrl}/all`)
            if (response.ok) {
                const data = await response.json()
                setUrls(data)
            } else {
                showNotification('Failed to fetch URLs', 'error')
            }
        } catch (error) {
            console.error('Error fetching URLs:', error)
            showNotification('Network error while fetching URLs', 'error')
        }
    }

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
    }

    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (formData.url === '') return;
        
        setLoading(true)
        try {
            if (editMode) {
                // UPDATE
                const response = await fetch(`${apiUrl}/url/${editId}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-type": "application/json"
                    },
                })
                
                if (response.ok) {
                    const data = await response.json()
                    setUrls(prev => prev.map(url => 
                        url._id === editId ? data : url
                    ))
                    resetForm()
                    showNotification('URL updated successfully!')
                } else {
                    const errorData = await response.json()
                    showNotification(errorData.message || 'Update failed', 'error')
                }
            } else {
                // CREATE
                const response = await fetch(`${apiUrl}/`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-type": "application/json"
                    },
                })
                
                if (response.ok) {
                    await fetchUrls() // Refresh the list
                    resetForm()
                    showNotification('URL created successfully!')
                } else {
                    const errorData = await response.json()
                    showNotification(errorData.message || 'Creation failed', 'error')
                }
            }
        } catch (err) {
            showNotification('Server Error', 'error')
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({ url: '', title: '', description: '' })
        setEditMode(false)
        setEditId(null)
    }

    const handleEdit = (url) => {
        setFormData({
            url: url.url,
            title: url.title || '',
            description: url.description || ''
        })
        setEditMode(true)
        setEditId(url._id)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this URL?')) return
        
        try {
            const response = await fetch(`${apiUrl}/url/${id}`, {
                method: 'DELETE'
            })
            
            if (response.ok) {
                setUrls(prev => prev.filter(url => url._id !== id))
                showNotification('URL deleted successfully!')
            } else {
                showNotification('Delete failed', 'error')
            }
        } catch (error) {
            showNotification('Server Error', 'error')
        }
    }

    return (
        <>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            
            <div className="shortener">
                <h2>{editMode ? 'Edit URL' : 'Create New Short URL'}</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="url">URL *</label>
                        <input
                            id="url"
                            type="url"
                            name="url"
                            className="form-control"
                            placeholder="https://example.com/very-long-url-that-needs-shortening"
                            value={formData.url}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="title">Title (Optional)</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="My Awesome Link"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            placeholder="A brief description of what this link is about..."
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                        />
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                            type="submit" 
                            className="btn-primary" 
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner"></span>
                            ) : editMode ? 'Update URL' : 'Create Short URL'}
                        </button>
                        
                        {editMode && (
                            <button 
                                type="button"
                                onClick={resetForm}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {/* URL List */}
                <div className="url-list">
                    <h3>Your URLs</h3>
                    
                    {urls.length === 0 ? (
                        <div className="empty-state">
                            <h4>No URLs created yet</h4>
                            <p>Create your first shortened URL above to get started!</p>
                        </div>
                    ) : (
                        <div>
                            {urls.map((url) => (
                                <div key={url._id} className="url-card">
                                    <div className="url-header">
                                        <h4 className="url-title">
                                            {url.title || 'Untitled'}
                                        </h4>
                                        <div className="url-actions">
                                            <button
                                                onClick={() => handleEdit(url)}
                                                className="btn-edit"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(url._id)}
                                                className="btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {url.description && (
                                        <p className="url-description">{url.description}</p>
                                    )}
                                    
                                    <div className="url-details">
                                        <div className="url-detail">
                                            <strong>Original:</strong>
                                            <a href={url.url} target="_blank" rel="noopener noreferrer">
                                                {url.url}
                                            </a>
                                        </div>
                                        <div className="url-detail">
                                            <strong>Short:</strong>
                                            <a href={`${apiUrl}/${url.shortUrlId}`} target="_blank" rel="noopener noreferrer" className="short-url">
                                                {`${apiUrl}/${url.shortUrlId}`}
                                            </a>
                                        </div>
                                        <div className="url-detail">
                                            <strong>Clicks:</strong>
                                            <span>{url.clicks}</span>
                                        </div>
                                        <div className="url-detail">
                                            <strong>Created:</strong>
                                            <span>{new Date(url.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}