import React, { useEffect, useRef, useState } from 'react';
import { IProduct } from './interface/IProduct';
import { getProduct } from './services/product.services';
import scanner from './assets/scan.svg';
import { Carousel } from 'flowbite-react';
// Azucar sintetica
import './App.css';
import { useSearchParams } from 'react-router-dom';

function App() {
  // Hooks 
  const [branch, setBranch] = useState<string>('');
  const [product, setProduct] = useState<IProduct | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [sku, setSku] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  // TimeOut
  let clearScan;

  // Ref
  const inputSearchRef = useRef(null);

  // Buscar producto
  const searchProduct = async (e: any) => {
    e.preventDefault();

    inputSearchRef!.current.value = "";
    clearTimeout(clearScan);

    // Deshabilitar campo de busqueda
    // inputSearchRef!.current.setAttribute('disabled',true);

    if (!sku) {
      setError(true);
      throw new Error('Ingrese un SKU');
    }

    const responseData: any = await getProduct(sku, searchParams);
    console.info(responseData);
    if (!responseData) {
      setNotFound(true);
    } else {
      setNotFound(false);
      console.log(product);
      setProduct(responseData); // Re-Renderer
    }

    clearScan = setTimeout(() => {
      setError(false);
      setNotFound(false);
      setProduct(null);
      inputSearchRef!.current.removeAttribute('disabled');
      inputSearchRef!.current.focus();
      clearTimeout(clearScan);
    }, 6000);
  };

  useEffect(() => {}, [product]);

  return (
    <>
      <div className="containers">
        <section className="product-contain">
          <header>
            <section className="header">
              <img
                src="https://precios.makrove.com/static/jf/images/red-mak.svg"
                alt="redvital+makro"
                className="logo"
              />
              <div className="search-control">
                <input
                  type="text"
                  id="search-input"
                  ref={inputSearchRef}
                  className="search br-hover-red"
                  onChange={(e) => setSku(e.target.value)}
                  required
                  autoFocus={true}
                  placeholder="C&oacute;digo del producto"
                />
                <button
                  id="search-button"
                  className="btn-search"
                  // disabled={!!product}
                  onClick={searchProduct}
                >
                  Buscar
                </button>
              </div>
            </section>
          </header>
          {product && !notFound ? (
            <main className="product-info">
              <section className="header-product-info">
                <span
                  className={`tag-product ${
                    product?.price <= product?.detail?.price ? 'invisible' : ''
                  }`}
                >
                  En Oferta
                </span>
                <div className="tag-group">
                  <span className="tag-product yellow">Cirugia</span>
                  <span className="tag-product cyan">Insumos MQ</span>
                </div>
              </section>
              <section className="body-product-info">
                <span className="product-title">{product?.name}</span>
                <span className="upc">Codigo: {product.sku}</span>
                <span className="tag-product cyan">Marca: OKF</span>
              </section>
              <section className="footer-product-info">
                <section>
                  <p className="label-price">Precio</p>
                  <p className="price">
                    Bs. {product.detail?.price || product.price}
                  </p>
                </section>
                <section>
                  <p className="label-price">Precio Ref.</p>
                  <p className="price float-right">
                    {product.detail?.price || product.price} #
                  </p>
                </section>
              </section>
            </main>
          ) : notFound ? (
            <main className="not-found-contain">
              <span className="not-found">Producto no encontrado</span>
            </main>
          ) : null}

          {!product && !notFound ? (
            <main className="not-found-contain">
              <img className="scanner" src={scanner} alt="scanner" />
              <span className="not-found">
                Escanee el producto que desea consultar el precio
              </span>
            </main>
          ) : null}
        </section>

        <section className="promotion-contain">
          <Carousel className="text-green-500" draggable={true}>
            <div id="promotion#1">
              <div className="product">
                <img
                  src="https://www.farmadon.com.ve/wp-content/uploads/2022/06/Clotrimazol-1-Crema-Vaginal-5-Aplicadores-X-50Gr.-Tiares-2v.png"
                  alt="redvital+makro"
                  className="product-img"
                />
                <span className="tag-promo">-30%</span>
              </div>
              <div className="promotion-info">
                <span className="promotion-title">
                  CLOTRIMAZOL 1% X 30G CREM VAG TIARES
                </span>
                <span className="tag-product cyan">Medicamentos</span>
                <p className="promotion-divider"></p>
              </div>
              <div className="promotion-price-container">
                <span className="promotion-price">
                  <p>$5</p>
                  <i className="decimal">25</i>
                </span>
                <span className="promotion-announce">¡SUPER PRECIOS!</span>
              </div>
            </div>
            <div id="promotion#2">
              <div className="product">
                <img
                  src="https://calox.com/wp-content/uploads/2023/08/Atamel-Forte.jpg"
                  alt="redvital+makro"
                  className="product-img"
                />
                <span className="tag-promo">-30%</span>
              </div>
              <div className="promotion-info">
                <span className="promotion-title">
                  ATAMEL FORTE 650MG TABLETAS
                </span>
                <span className="tag-product cyan">Medicamentos</span>
                <p className="promotion-divider"></p>
              </div>
              <div className="promotion-price-container">
                <span className="promotion-price">
                  <p>$5</p>
                  <i className="decimal">25</i>
                </span>
                <span className="promotion-announce">¡SUPER PRECIOS!</span>
              </div>
            </div>
            <div id="promotion#2">
              <div className="product">
                <img
                  src="https://www.farmago.com.ve/wp-content/uploads/2020/12/imagen65-01-4.png"
                  alt="redvital+makro"
                  className="product-img"
                />
                <span className="tag-promo">-30%</span>
              </div>
              <div className="promotion-info">
                <span className="promotion-title">
                  AFLAMAX 50MG 20 TAB TABLETAS
                </span>
                <span className="tag-product cyan">Medicamentos</span>
                <p className="promotion-divider"></p>
              </div>
              <div className="promotion-price-container">
                <span className="promotion-price">
                  <p>$4</p>
                  <i className="decimal">25</i>
                </span>
                <span className="promotion-announce">¡SUPER PRECIOS!</span>
              </div>
            </div>
          </Carousel>

          {/* <div className="product">
            <img
              src="https://www.farmadon.com.ve/wp-content/uploads/2022/06/Clotrimazol-1-Crema-Vaginal-5-Aplicadores-X-50Gr.-Tiares-2v.png"
              alt="redvital+makro"
              className="product-img"
            />
            <span className="tag-promo">-30%</span>
          </div>
          <div className="promotion-info">
            <span className="promotion-title">
              CLOTRIMAZOL 1% X 30G CREM VAG TIARES
            </span>
            <span className="tag-product cyan">Medicamentos</span>
            <p className="promotion-divider"></p>
          </div>
          <div className="promotion-price-container">
            <span className="promotion-price">
              <p>$5</p>
              <i className="decimal">25</i>
            </span>
            <span className="promotion-announce">¡SUPER PRECIOS!</span>
          </div> */}
        </section>
      </div>
    </>
  );
}

export default App;
