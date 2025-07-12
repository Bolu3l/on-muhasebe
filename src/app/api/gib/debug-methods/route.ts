import { NextResponse } from 'next/server';
import { GIBApi } from '@/lib/gib-api';

export async function GET() {
  try {
    const gibApi = new GIBApi();
    await gibApi.initialize();

    // User service methods
    const userService = (gibApi as any).userServiceClient;
    const userMethods = userService ? Object.getOwnPropertyNames(userService).filter((name: string) => 
      typeof (userService as any)[name] === 'function' && 
      (name.includes('login') || name.includes('logout') || name.includes('Login') || name.includes('Logout'))
    ) : [];

    // Connector service methods  
    const connectorService = (gibApi as any).connectorServiceClient;
    const connectorMethods = connectorService ? Object.getOwnPropertyNames(connectorService).filter((name: string) => 
      typeof (connectorService as any)[name] === 'function' && 
      (name.includes('belge') || name.includes('Belge') || name.includes('erp') || name.includes('durum') || name.includes('Durum'))
    ) : [];

    // WSDL descriptions
    const userWsdl = userService?.wsdl?.definitions;
    const connectorWsdl = connectorService?.wsdl?.definitions;

    return NextResponse.json({
      success: true,
      data: {
        userService: {
          available: !!userService,
          methods: userMethods,
          wsdl: userWsdl ? Object.keys(userWsdl) : null
        },
        connectorService: {
          available: !!connectorService,
          methods: connectorMethods,
          wsdl: connectorWsdl ? Object.keys(connectorWsdl) : null
        },
        loginStatus: gibApi.getStatus()
      },
      message: "GIB services debug bilgileri"
    });

  } catch (error) {
    console.error('Debug methods hatası:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      message: "Debug methods hatası"
    }, { status: 500 });
  }
} 