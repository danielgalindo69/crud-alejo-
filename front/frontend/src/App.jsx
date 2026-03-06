import { useState, useEffect } from 'react';
import './index.css';

const API_URL = 'http://localhost:3000/api/cars';

function App() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ id: null, marca: '', modelo: '', anio: '', color: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCars(data);
    } catch (err) {
      console.error('Error fetching cars:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${form.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ id: null, marca: '', modelo: '', anio: '', color: '' });
        setIsEditing(false);
        fetchCars();
      } else {
        const errorData = await response.json();
        alert(`Error al guardar: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (err) {
      console.error('Error saving car:', err);
      alert('Error de red al intentar guardar el carro');
    }
  };

  const handleEdit = (car) => {
    setForm(car);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este carro?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchCars();
      } catch (err) {
        console.error('Error deleting car:', err);
      }
    }
  };

  const handleCancel = () => {
    setForm({ id: null, marca: '', modelo: '', anio: '', color: '' });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>🚗 Car Manager Pro</h1>
      
      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Marca</label>
              <input name="marca" value={form.marca} onChange={handleChange} placeholder="Ej: Toyota" required />
            </div>
            <div className="input-group">
              <label>Modelo</label>
              <input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Ej: Corolla" required />
            </div>
            <div className="input-group">
              <label>Año</label>
              <input name="anio" type="number" value={form.anio} onChange={handleChange} placeholder="2024" required />
            </div>
            <div className="input-group">
              <label>Color</label>
              <input name="color" value={form.color} onChange={handleChange} placeholder="Blanco" required />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Actualizar Carro' : 'Añadir Carro'}
            </button>
            {isEditing && (
              <button type="button" onClick={handleCancel} className="btn-delete" style={{ flex: '0 0 auto', width: 'auto' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="car-grid">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-info">
                <h3>{car.marca} {car.modelo}</h3>
                <div className="car-details">
                  <span>📅 Año: {car.anio}</span>
                  <span>🎨 Color: {car.color}</span>
                </div>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(car)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(car.id)} className="btn-delete">Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No hay carros registrados aún.</div>
        )}
      </div>
    </div>
  );
}

export default App;
