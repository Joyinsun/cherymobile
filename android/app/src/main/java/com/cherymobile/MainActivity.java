package com.cherymobile;

import android.content.Intent;
import com.tkporter.sendsms.SendSMSPackage;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;
import com.reactnativenavigation.controllers.SplashActivity;
import android.os.Bundle;
//import com.getui.reactnativegetui.GetuiModule;

public class MainActivity extends SplashActivity {
    
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        //probably some other stuff here
        SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
    }

	@Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);

        view.setBackgroundColor(Color.parseColor("#FFFFFF"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#1E90FF"));
        textView.setText("Chery");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        view.addView(textView);
        return view;
    }

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //GetuiModule.initPush(this);
    }
}

