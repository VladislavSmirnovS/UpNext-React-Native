package com.upnext_mobile;

import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*;
import android.content.Intent;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "upnext_mobile";
  }

  // Override onStart, onNewIntent:
  @Override
  protected void onStart() {
      super.onStart();
      RNBranchModule.initSession(getIntent().getData(), this);
  }

  @Override
  public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      RNBranchModule.onNewIntent(intent);
  }
}
