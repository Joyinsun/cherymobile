package com.cherymobile;

import com.tkporter.sendsms.SendSMSPackage;
import com.reactnativenavigation.NavigationApplication;
//import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
//import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import java.util.List;
import java.util.Arrays;
import com.facebook.soloader.SoLoader;
//import com.horcrux.svg.SvgPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.pritesh.calldetection.CallDetectionManager;
//import com.getui.reactnativegetui.GetuiModule;
//import com.getui.reactnativegetui.GetuiPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;

public class MainApplication extends NavigationApplication {

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
            //new MainReactPackage(),
            //new ReactNativePushNotificationPackage(),
            new RCTCameraPackage(),
            new CookieManagerPackage(),
            //new GetuiPackage(),
            //new RNNotificationsPackage(MainApplication.this),
            new CallDetectionManager(MainApplication.this),
            //new SvgPackage(),
            //new NavigationReactPackage(),
            new VectorIconsPackage(),
            //new RCTSwipeRefreshLayoutPackage(),
            //new ReactNativeFingerprintScannerPackage(),
            SendSMSPackage.getInstance()
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }

     @Override
      public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
 }