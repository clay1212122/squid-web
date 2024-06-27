
'use client';
import TableInfo from './components/TableInfo';
import { DashboardStore } from '../stores/Dashboard';
import { useEffect, useState } from 'react';
import Mapita from './components/Map';
import { redirect } from 'next/navigation';
import { AuthStore } from '../stores/Auth';

export default function Page() {

const authStore = AuthStore();
  const columns = [
    {
      key: "label",
      label: "Producto",
    },
    {
      key: "total",
      label: "Cantidad",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const [markers, setMarkers] = useState([]);

  const dashboardStore = DashboardStore();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const getProducts = async () => {
    try {
      const response = await dashboardStore.getProducts(authStore.user.institution);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const getTraps = async ()=> {
    try {
      let type = selected.values().next().value
      const response = await dashboardStore.getSpecificTraps(type);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selected) {
      getTraps().then((traps)=> {
        let markers = [];
        traps.forEach(element => {
          markers.push({lat: parseFloat(element.latitude) , lng: parseFloat(element.longitud)})
        });
        setMarkers(markers)
      })
    }

  }, [selected])
  
  useEffect(() => {
    if (!authStore.logged) {
      redirect('/auth/login'); 
    }
    getProducts().then((productsResponse) => {
      setProducts(productsResponse);
      console.log(productsResponse);
    })
  }, [])


  return (
    <div className="w-full overflow-x-auto">
      <div className="m-4 mb-10 grid grid-cols-12">
        <h1 className="col-span-12 w-full text-4xl font-bold">
          Bievenido!
        </h1>
      </div>
      {/* <div className="mx-24 mb-10 grid grid-cols-4 justify-items-center gap-52">
        <div className="col">
          <CardInfo
            number={'15M'}
            title={'Venta de AGAVENOL'}
            amount={'23.5'}
          />
        </div>
        <div className="col">
          <CardInfo number={'27K'} title={'Venta de producto'} amount={'18'} />
        </div>
        <div className="col">
          <CardInfo
            number={'52M'}
            title={'Cantidad de trampas'}
            amount={'7.4'}
          />
        </div>
        <div className="col">
          <CardInfo
            number={'43M'}
            title={'Cantidad de usuarios'}
            amount={'4'}
          />
        </div>
      </div> */}
      {/* <div className="grid h-2/4 grid-cols-12 justify-items-center">
        <div className="col-span-12 md:col-span-6">
          <LineChart />
        </div>
        <div className="col-span-12 md:col-span-6">
          <BarChart />
        </div>
      </div> */}
      {/* <div className="grid grid-cols-2 justify-items-center mb-10">
        <div className="col h-3/5 w-9/12">
          <TableInfo info={tabla1} columns={columns1} />
        </div>
        <div className="col h-20 w-9/12">
          <div className="flex flex-row">
            <DoughnutChart />
            <TableInfo info={tabla2} columns={columns2} />
          </div>
        </div>
      </div> */}
      <p className="col-span-12 w-full text-xl font-bold">Productos</p>
      <div className='w-full p-4'>
        <TableInfo rows={products} columns={columns} setSelected={setSelected} idRow={'label'}/>
        <div className='mt-12'>
        <Mapita markers={markers} setMarkers={setMarkers} />
        </div>

      </div>

    </div>
  );
}
