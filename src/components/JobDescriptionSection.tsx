import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';


const JobDescriptionSection = () => {
  return (
    <section className="">
      <div className="flex items-start justify-between">

        {/* Columna izquierda */}
        <div className="w-full max-w-10/19">

          {/* Descripción del puesto */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold py-6 flex items-center gap-2">
              <ArticleIcon />
              Descripción del puesto
            </h3>
            <p className="text-gray-700 leading-relaxed">
              En Adecco Perú, buscamos personas con talento que quieran sumarse a nuestro equipo de logística en el puesto de Operario/a de Almacén. Esta es una gran oportunidad para quienes deseen incorporarse a una empresa con presencia nacional, con ingreso inmediato a planilla y todos los beneficios de ley.
              <span className='block h-2'></span>
              Buscamos personas responsables, con ganas de aprender y disponibilidad para trabajar en turnos rotativos. Si tienes secundaria completa y muchas ganas de trabajar, ¡postula hoy!
            </p>
          </div>

          {/* Responsabilidades clave */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold py-6 flex items-center gap-2">
              <CheckCircleIcon className="text-green-600" />
              Responsabilidades clave
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Cargar, descargar y ordenar mercadería.</li>
              <li>Preparar pedidos para despacho y distribución.</li>
              <li>Verificar el estado de los productos antes del almacenaje.</li>
              <li>Mantener el orden y limpieza del área de trabajo.</li>
              <li>Apoyar en inventarios físicos y control de stock.</li>
            </ul>
          </div>

          {/* Habilidades */}
          <div className='mb-4'>
            <h3 className="text-xl font-semibold py-6 flex items-center gap-2">
              <PsychologyIcon className="text-pink-600" />
              Habilidades
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Et nunc ut tempus duis nisl sed massa.</li>
              <li>Ornare varius faucibus nisi vitae vitae cras ornare.</li>
              <li>Tortor amet porta proin in.</li>
              <li>Orci imperdiet nisi dignissim pellentesque morbi vitae.</li>
              <li>Tortor amet porta proin in.</li>
            </ul>
          </div>
        </div>

        {/* Columna derecha: Descripción general */}
        <aside className="w-full max-w-5/19 bg-blue-300 bg-opacity-40 px-6 pb-6 rounded-xl shadow-md text-gray-800">
          <h3 className="text-xl font-semibold py-6">Descripción general</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <PersonIcon className='text-white'/>
              <div className='flex flex-col gap-1'>
                <span className="font-medium">Puesto:</span>
                <span>Operario/a de Almacén</span>
              </div>
            </div>
            <div className="flex gap-2">
              <AccessTimeIcon className='text-white'/>
              <div className='flex flex-col gap-1'>
                <span className="font-medium">Tipo de Jornada:</span>
                <span>Tiempo completo</span>
              </div>
            </div>
            <div className="flex gap-2">
              <WorkIcon className='text-white'/>
              <div className='flex flex-col gap-1'>
                <span className="font-medium">Sector:</span>
                <span>Almacén</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default JobDescriptionSection;