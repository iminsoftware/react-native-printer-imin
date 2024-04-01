package com.printerimin;

import android.content.Context;
import android.os.Build;
import android.text.TextUtils;
import android.util.Log;

import java.io.OutputStream;
import java.lang.reflect.Method;

public class Utils {
  private static String TAG = "RN_print_Utils";

  private Utils() {
  }

  public static Utils getInstance() {
    return Holder.instance;
  }

  private static class Holder {
    private static final Utils instance = new Utils();
  }

  private Context mContext;

  public Context getContext() {
    return mContext;
  }

  public void setContext(Context context) {
    this.mContext = context;
  }

  public String getPlaform() {
    return getSystemProperties("ro.board.platform");
  }

  public String getModel() {
    String model = "";
    String plaform = getPlaform();

    if (!TextUtils.isEmpty(plaform) && plaform.startsWith("mt")) {
      model = getSystemProperties("ro.neostra.imin_model");
    } else if (!TextUtils.isEmpty(plaform) && plaform.startsWith("ums512")) {
      model = Build.MODEL;
    } else if (!TextUtils.isEmpty(plaform) && plaform.startsWith("sp9863a")) {
      model = Build.MODEL;
      if (model.equals("I22M01")) {
        model = "MS1-11";
      }
    } else {
      model = getSystemProperties("sys.neostra_oem_id");
      android.util.Log.d(TAG, "model " + model);
      if (!TextUtils.isEmpty(model) && model.length() > 4) {
        model = filterModel(model.substring(0, 5));
        String oemId = getSystemProperties("sys.neostra_oem_id");
        if (oemId.length() > 27 && oemId.startsWith("W26MP")) {
          String num28 = String.valueOf(oemId.charAt(27));
          if ("S".equalsIgnoreCase(num28)) {
            model = "D3-510";
          }
        }
      } else {
        model = getSystemProperties("ro.neostra.imin_model");
      }
      if ("".equals(model)) {
        model = Build.MODEL;
        if (model.equals("I22D01")) {
          model = "DS1-11";
        }
      }

    }
    return model;
  }

  private String filterModel(String str) {
    switch (str) {
      case "W21XX":
        return "D1-501";
      case "W21MX":
        return "D1-502";
      case "W21DX":
        return "D1-503";
      case "W22XX":
        return "D1p-601";
      case "W22MX":
        return "D1p-602";
      case "W22DX":
        return "D1p-603";
      case "W22DC":
        return "D1p-604";
      case "W23XX":
        return "D1w-701";
      case "W23MX":
        return "D1w-702";
      case "W23DX":
        return "D1w-703";
      case "W23DC":
        return "D1w-704";
      case "V1GXX":
      case "V1GPX":
        return "D2-401";
      case "V1XXX":
      case "V1PXX":
        return "D2-402";
      case "V2BXX":
        return "D2 Pro";
      case "1824P":
        if (getSystemProperties("persist.sys.customername").equals("ZKSY-301")) {
          return "ZKSY-301";
        } else if (getSystemProperties("persist.sys.customername").equals("K3")) {
          return "K3";
        }
        return "D3-501";//yimin
      case "P24MP":
        String customerName = getSystemProperties("persist.sys.customername");
        if (customerName.equals("2Dfire")) {
          return "P10M";
        } else if (customerName.equalsIgnoreCase("Bestway")) {
          return "V5-1824M Plus";
        } else if (customerName.equalsIgnoreCase("idiotehs")) {
          return "CTA-D3M";
        } else {
          return "D3-503";//yimin
        }
//                return "D3-503";//yimin
      case "P24XP":
        return "D3-502";
      case "W26XX":
      case "W26PX":
        return "D3-504";
      case "W26MX":
      case "W26MP":
        return "D3-505";
      case "W27LX":
        return "D4-501";
      case "W27LD":
        return "D4-502";
      case "W27XX":
      case "W27PX":
        return "D4-503";
      case "W27MX":
      case "W27MP":
        return "D4-504";
      case "W27DX":
        return "D4-505";
      case "1824M":
        return "1824M";
      case "1824D":
        return "1824D";
      case "K21XX":
        return "K1-101";
      case "D20XX":
        return "R1-201";
      case "D20TX":
        return "R1-202";
      case "W17BX":
        return "S1-702";
      case "W17XX":
      case "W17PX"://rk3566,android11
        return "S1-701";
      case "W26HX":
        return "D3-504";
      case "W26HM":
        return "D3-505";
      case "W26HD":
        return "D3-506";
      case "W26HG":
      case "W26GP":
        return "K2-201";
      case "D224G":
        return "R2-301";//D224GM04SXXT3PXW3E1MXV110CDXXX
      case "D22XX":
        return "R2-301";// error ?
      case "D22TX":
        return "R2-302";
      case "W27DP":
        return "D4-505";
      case "K21PX":
        return "K1-101";
      case "W23PX":
        return "D1w-701";
      case "W23MP":
        return "D1w-702";
      case "W23DP":
        return "D1w-703";
      case "W28XX":
      case "W28MX":
        customerName = getSystemProperties("persist.sys.customername");
        if (customerName.equals("2Dfire")) {
          return "P5";
        } else if ("Dingjian".equals(customerName)) {
          return "DJ-P28";
        } else if ("baohuoli".equalsIgnoreCase(customerName)) {
          return "FS-5216";
        } else {
          return "Swan 1";//yimin device name
        }
//                return "Swan 1";//yimin device name
      case "W28GX":
        String w28gxCustomerName = getSystemProperties("persist.sys.customername");
        if (w28gxCustomerName.equals("2Dfire")) {
          return "P5K";
        } else if ("Dingjian".equals(w28gxCustomerName)) {
          return "DJ-P28K";
        } else if ("baohuoli".equalsIgnoreCase(w28gxCustomerName)) {
          return "FS-5216";
        } else {
          return "Swan 1k";//yimin device name
        }
      case "W26DP":
        return "D3-506";
      case "26PXX":
        return "P10CS";//yimin device name
      case "26MPX":
        return "P10DS";//yimin device name
//                return "Swan 1k";//yimin device name
      default:
        break;
    }
    return "";
  }

  public String getSystemProperties(String property) {
    String value = "";
    try {
      Class clazz = Class.forName("android.os.SystemProperties");
      Method getter = clazz.getDeclaredMethod("get", String.class);
      value = (String) getter.invoke(null, property);
    } catch (Exception e) {
      Log.d(TAG, "Unable to read system properties");
    }
    return value;
  }

  public void opencashBox() {
    int open = 1;
    OutputStream out = null;
    String cmd = "echo " + open + " > /sys/class/neostra_gpioctl/dev/gpioctl " + "\n";
    String model = getModel();
    if (model.equals("D1") || (model.equals("D1-Pro"))
      || (model.equals("Falcon 1")) || (model.equals("I22T01"))
      || getPlaform().equalsIgnoreCase("ums512")) {
      cmd = "echo " + open + " > /sys/extcon-usb-gpio/cashbox_en " + "\n";
    }/*else if(model.equals("Swan 1") || model.equals("DS1-11")){
            cmd = "echo cash_en:0 > /sys/devices/platform/gpio_ctrl/switch_gpio " + "\n";
        }*/
    try {
      Process exeEcho = Runtime.getRuntime().exec("sh");
      out = exeEcho.getOutputStream();
      out.write(cmd.getBytes());
      out.flush();
      Log.d("iminLib", " " + cmd);
            /*if(model.equals("Swan 1") || model.equals("DS1-11")){
                Thread.sleep(500);
                String cmd2 = "echo cash_en:1 > /sys/devices/platform/gpio_ctrl/switch_gpio " + "\n";
                out.write(cmd2.getBytes());
                out.flush();
            }*/
    } catch (Exception e) {
      //e.printStackTrace();
      Log.d("iminLib", "cmdGpioPwrOn faild :" + e.getMessage());
    } finally {
      if (out != null) {
        try {
          out.close();
        } catch (Exception e) {
          //e.printStackTrace();
          Log.d("iminLib", "close stream faild :" + e.getMessage());
        }
      }
    }
  }

  public String getPrinterStatusText(int code) {
    if (code == 0) {
      return "Printer is normal!";
    } else if (code == 1) {
      return "The printer and call library do not match!";
    } else if (code == 3) {
      return "Print head open!";
    } else if (code == 4) {
      return "The cutter is not reset!!";
    } else if (code == 5) {
      return "Overheated!";
    } else if (code == 6) {
      return "Black label error!";
    } else if (code == 7) {
      return "No Paper Feed!";
    } else if (code == 8) {
      return "Paper Running Out!";
    } else if (code == 99) {
      return "Other errors!";
    } else {
      return "Printer is not connected or powered on!";
    }
  }
}
