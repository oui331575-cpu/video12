import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Settings, DollarSign, MapPin, BookOpen, Bell, Download, Upload, FolderSync as Sync, LogOut, Save, Plus, CreditCard as Edit, Trash2, Eye, EyeOff, User, Lock, AlertCircle, CheckCircle, Info, X, Globe, Calendar, Monitor, Image, Camera } from 'lucide-react';

export function AdminPanel() {
  const {
    state,
    login,
    logout,
    updatePrices,
    addDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    addNovel,
    updateNovel,
    deleteNovel,
    clearNotifications,
    exportSystemConfig,
    exportCompleteSourceCode,
    syncWithRemote,
    syncAllSections
  } = useAdmin();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'prices' | 'delivery' | 'novels' | 'notifications' | 'system'>('prices');
  const [priceForm, setPriceForm] = useState(state.prices);
  const [deliveryForm, setDeliveryForm] = useState({ name: '', cost: 0 });
  const [editingDeliveryZone, setEditingDeliveryZone] = useState<any>(null);
  const [novelForm, setNovelForm] = useState({
    titulo: '',
    genero: '',
    capitulos: 1,
    año: new Date().getFullYear(),
    descripcion: '',
    pais: '',
    imagen: '',
    estado: 'finalizada' as 'transmision' | 'finalizada'
  });
  const [editingNovel, setEditingNovel] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Update price form when state changes
  useEffect(() => {
    setPriceForm(state.prices);
  }, [state.prices]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (!success) {
      alert('Credenciales incorrectas');
    }
  };

  const handlePriceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePrices(priceForm);
  };

  const handleAddDeliveryZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (deliveryForm.name && deliveryForm.cost >= 0) {
      addDeliveryZone(deliveryForm);
      setDeliveryForm({ name: '', cost: 0 });
    }
  };

  const handleUpdateDeliveryZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeliveryZone) {
      updateDeliveryZone(editingDeliveryZone);
      setEditingDeliveryZone(null);
    }
  };

  const handleAddNovel = (e: React.FormEvent) => {
    e.preventDefault();
    if (novelForm.titulo && novelForm.genero && novelForm.capitulos > 0) {
      addNovel(novelForm);
      setNovelForm({
        titulo: '',
        genero: '',
        capitulos: 1,
        año: new Date().getFullYear(),
        descripcion: '',
        pais: '',
        imagen: '',
        estado: 'finalizada'
      });
    }
  };

  const handleUpdateNovel = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNovel) {
      updateNovel(editingNovel);
      setEditingNovel(null);
    }
  };

  const handleExportSourceCode = async () => {
    setIsExporting(true);
    try {
      await exportCompleteSourceCode();
    } catch (error) {
      console.error('Error exporting source code:', error);
      alert('Error al exportar el código fuente');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      await syncAllSections();
    } catch (error) {
      console.error('Error syncing all sections:', error);
      alert('Error en la sincronización completa');
    } finally {
      setIsSyncing(false);
    }
  };

  // Available countries for novels
  const availableCountries = [
    'Cuba',
    'Turquía',
    'México',
    'Brasil',
    'Colombia',
    'Argentina',
    'España',
    'Estados Unidos',
    'Corea del Sur',
    'India',
    'Reino Unido',
    'Francia',
    'Italia',
    'Alemania',
    'Japón',
    'China',
    'Rusia',
    'Venezuela',
    'Chile',
    'Perú',
    'Ecuador',
    'No especificado'
  ];

  // Available genres for novels
  const availableGenres = [
    'Drama',
    'Romance',
    'Acción',
    'Comedia',
    'Familia',
    'Thriller',
    'Misterio',
    'Histórico',
    'Fantasía',
    'Ciencia Ficción',
    'Musical',
    'Aventura'
  ];

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-4">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-blue-100">TV a la Carta</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Última sincronización: {new Date(state.syncStatus.lastSync).toLocaleTimeString()}
              </div>
              <button
                onClick={logout}
                className="flex items-center text-red-600 hover:text-red-800 font-medium"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {state.notifications.length > 0 && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notificaciones Recientes ({state.notifications.length})
                </h3>
                <button
                  onClick={clearNotifications}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Limpiar todas
                </button>
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {state.notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-4 border-b border-gray-100 last:border-b-0 ${
                    notification.type === 'success' ? 'bg-green-50' :
                    notification.type === 'error' ? 'bg-red-50' :
                    notification.type === 'warning' ? 'bg-yellow-50' :
                    'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full mr-3 ${
                      notification.type === 'success' ? 'bg-green-100' :
                      notification.type === 'error' ? 'bg-red-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {notification.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                       notification.type === 'error' ? <AlertCircle className="h-4 w-4 text-red-600" /> :
                       notification.type === 'warning' ? <AlertCircle className="h-4 w-4 text-yellow-600" /> :
                       <Info className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.section} • {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'prices', label: 'Precios', icon: DollarSign },
                { id: 'delivery', label: 'Zonas de Entrega', icon: MapPin },
                { id: 'novels', label: 'Gestión de Novelas', icon: BookOpen },
                { id: 'notifications', label: 'Notificaciones', icon: Bell },
                { id: 'system', label: 'Sistema', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Prices Tab */}
            {activeTab === 'prices' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración de Precios</h2>
                <form onSubmit={handlePriceUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Películas (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.moviePrice}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, moviePrice: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Series por Temporada (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.seriesPrice}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, seriesPrice: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recargo por Transferencia (%)
                      </label>
                      <input
                        type="number"
                        value={priceForm.transferFeePercentage}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, transferFeePercentage: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Novelas por Capítulo (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.novelPricePerChapter}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, novelPricePerChapter: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Precios
                  </button>
                </form>
              </div>
            )}

            {/* Delivery Zones Tab */}
            {activeTab === 'delivery' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Zonas de Entrega</h2>
                
                {/* Add/Edit Form */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingDeliveryZone ? 'Editar Zona' : 'Agregar Nueva Zona'}
                  </h3>
                  <form onSubmit={editingDeliveryZone ? handleUpdateDeliveryZone : handleAddDeliveryZone} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre de la Zona
                        </label>
                        <input
                          type="text"
                          value={editingDeliveryZone ? editingDeliveryZone.name : deliveryForm.name}
                          onChange={(e) => {
                            if (editingDeliveryZone) {
                              setEditingDeliveryZone(prev => ({ ...prev, name: e.target.value }));
                            } else {
                              setDeliveryForm(prev => ({ ...prev, name: e.target.value }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: Santiago de Cuba > Centro"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Costo de Entrega (CUP)
                        </label>
                        <input
                          type="number"
                          value={editingDeliveryZone ? editingDeliveryZone.cost : deliveryForm.cost}
                          onChange={(e) => {
                            if (editingDeliveryZone) {
                              setEditingDeliveryZone(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }));
                            } else {
                              setDeliveryForm(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingDeliveryZone ? 'Actualizar' : 'Agregar'} Zona
                      </button>
                      
                      {editingDeliveryZone && (
                        <button
                          type="button"
                          onClick={() => setEditingDeliveryZone(null)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Zones List */}
                <div className="space-y-4">
                  {state.deliveryZones.map((zone) => (
                    <div key={zone.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{zone.name}</h4>
                        <p className="text-sm text-gray-600">${zone.cost.toLocaleString()} CUP</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingDeliveryZone(zone)}
                          className="text-blue-600 hover:text-blue-800 p-2"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteDeliveryZone(zone.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Novels Tab */}
            {activeTab === 'novels' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestión de Novelas</h2>
                
                {/* Add/Edit Form */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingNovel ? 'Editar Novela' : 'Agregar Nueva Novela'}
                  </h3>
                  <form onSubmit={editingNovel ? handleUpdateNovel : handleAddNovel} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Título de la Novela
                        </label>
                        <input
                          type="text"
                          value={editingNovel ? editingNovel.titulo : novelForm.titulo}
                          onChange={(e) => {
                            if (editingNovel) {
                              setEditingNovel(prev => ({ ...prev, titulo: e.target.value }));
                            } else {
                              setNovelForm(prev => ({ ...prev, titulo: e.target.value }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: El Turco"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Género
                        </label>
                        <select
                          value={editingNovel ? editingNovel.genero : novelForm.genero}
                          onChange={(e) => {
                            if (editingNovel) {
                              setEditingNovel(prev => ({ ...prev, genero: e.target.value }));
                            } else {
                              setNovelForm(prev => ({ ...prev, genero: e.target.value }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Seleccionar género</option>
                          {availableGenres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número de Capítulos
                        </label>
                        <input
                          type="number"
                          value={editingNovel ? editingNovel.capitulos : novelForm.capitulos}
                          onChange={(e) => {
                            if (editingNovel) {
                              setEditingNovel(prev => ({ ...prev, capitulos: parseInt(e.target.value) || 1 }));
                            } else {
                              setNovelForm(prev => ({ ...prev, capitulos: parseInt(e.target.value) || 1 }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Año
                        </label>
                        <input
                          type="number"
                          value={editingNovel ? editingNovel.año : novelForm.año}
                          onChange={(e) => {
                            if (editingNovel) {
                              setEditingNovel(prev => ({ ...prev, año: parseInt(e.target.value) || new Date().getFullYear() }));
                            } else {
                              setNovelForm(prev => ({ ...prev, año: parseInt(e.target.value) || new Date().getFullYear() }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1900"
                          max={new Date().getFullYear() + 5}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          País de Origen
                        </label>
                        <select
                          value={editingNovel ? editingNovel.pais : novelForm.pais}
                          onChange={(e) => {
                            if (editingNovel) {
                              setEditingNovel(prev => ({ ...prev, pais: e.target.value }));
                            } else {
                              setNovelForm(prev => ({ ...prev, pais: e.target.value }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seleccionar país</option>
                          {availableCountries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado de la Novela
                        </label>
                        <select
                          value={editingNovel ? editingNovel.estado : novelForm.estado}
                          onChange={(e) => {
                            if (editingNovel) {
                              setEditingNovel(prev => ({ ...prev, estado: e.target.value as 'transmision' | 'finalizada' }));
                            } else {
                              setNovelForm(prev => ({ ...prev, estado: e.target.value as 'transmision' | 'finalizada' }));
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="finalizada">✅ Finalizada</option>
                          <option value="transmision">📡 En Transmisión</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL de Imagen (Opcional)
                      </label>
                      <input
                        type="url"
                        value={editingNovel ? editingNovel.imagen : novelForm.imagen}
                        onChange={(e) => {
                          if (editingNovel) {
                            setEditingNovel(prev => ({ ...prev, imagen: e.target.value }));
                          } else {
                            setNovelForm(prev => ({ ...prev, imagen: e.target.value }));
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                      </label>
                      <textarea
                        value={editingNovel ? editingNovel.descripcion : novelForm.descripcion}
                        onChange={(e) => {
                          if (editingNovel) {
                            setEditingNovel(prev => ({ ...prev, descripcion: e.target.value }));
                          } else {
                            setNovelForm(prev => ({ ...prev, descripcion: e.target.value }));
                          }
                        }}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Descripción de la novela..."
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingNovel ? 'Actualizar' : 'Agregar'} Novela
                      </button>
                      
                      {editingNovel && (
                        <button
                          type="button"
                          onClick={() => setEditingNovel(null)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Novels List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Novelas Registradas ({state.novels.length})
                  </h3>
                  {state.novels.map((novel) => (
                    <div key={novel.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-medium text-gray-900 mr-3">{novel.titulo}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              novel.estado === 'transmision' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {novel.estado === 'transmision' ? '📡 En Transmisión' : '✅ Finalizada'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Género:</span> {novel.genero}
                            </div>
                            <div>
                              <span className="font-medium">Capítulos:</span> {novel.capitulos}
                            </div>
                            <div>
                              <span className="font-medium">Año:</span> {novel.año}
                            </div>
                            <div>
                              <span className="font-medium">País:</span> {novel.pais || 'No especificado'}
                            </div>
                          </div>
                          {novel.descripcion && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{novel.descripcion}</p>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => setEditingNovel(novel)}
                            className="text-blue-600 hover:text-blue-800 p-2"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteNovel(novel.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Centro de Notificaciones</h2>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-blue-900">Notificaciones del Sistema</h3>
                      <p className="text-sm text-blue-700">Total: {state.notifications.length}</p>
                    </div>
                    <button
                      onClick={clearNotifications}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Limpiar Todas
                    </button>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {state.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border rounded-lg p-4 ${
                        notification.type === 'success' ? 'bg-green-50 border-green-200' :
                        notification.type === 'error' ? 'bg-red-50 border-red-200' :
                        notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-1 rounded-full mr-3 ${
                          notification.type === 'success' ? 'bg-green-100' :
                          notification.type === 'error' ? 'bg-red-100' :
                          notification.type === 'warning' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          {notification.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                           notification.type === 'error' ? <AlertCircle className="h-4 w-4 text-red-600" /> :
                           notification.type === 'warning' ? <AlertCircle className="h-4 w-4 text-yellow-600" /> :
                           <Info className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded-full mr-2">{notification.section}</span>
                            <span>{new Date(notification.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración del Sistema</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Export/Import */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Exportar/Importar</h3>
                    <div className="space-y-3">
                      <button
                        onClick={exportSystemConfig}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Exportar Configuración JSON
                      </button>
                      
                      <button
                        onClick={handleExportSourceCode}
                        disabled={isExporting}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        {isExporting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Exportando...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Exportar Código Fuente
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sync */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sincronización</h3>
                    <div className="space-y-3">
                      <button
                        onClick={syncWithRemote}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Sync className="h-4 w-4 mr-2" />
                        Sincronizar con Remoto
                      </button>
                      
                      <button
                        onClick={handleSyncAll}
                        disabled={isSyncing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        {isSyncing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sincronizando...
                          </>
                        ) : (
                          <>
                            <Sync className="h-4 w-4 mr-2" />
                            Sincronización Completa
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* System Info */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Versión:</span>
                      <span className="ml-2 text-gray-600">{state.systemConfig.version}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Última exportación:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(state.systemConfig.lastExport).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Estado de sincronización:</span>
                      <span className={`ml-2 ${state.syncStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                        {state.syncStatus.isOnline ? 'En línea' : 'Desconectado'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Cambios pendientes:</span>
                      <span className="ml-2 text-gray-600">{state.syncStatus.pendingChanges}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}