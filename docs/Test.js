/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./smartsolve.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./smartsolve.js":
/*!***********************!*\
  !*** ./smartsolve.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// set global variables\nvar runErrors = [];\nvar cwf;\nvar rwf;\nvar guide;\nconst allowedOrigins = [\n  'https://medtronicdev.pilgrimasp.com',\n  'https://medtronicval.pilgrimasp.com',\n  'https://medtronicprod.pilgrimasp.com'\n];\nif (!allowedOrigins.includes(window.location.origin)) {\n  alert(`Bookmarklet cannot be used at ${window.location.origin}.`)\n} else if (\n  !document.querySelector(\"#stepName\") || document.querySelector(\"#stepName\").innerText != 'Complaint Investigation'\n) {\n  alert('Please navigate to Complaint Investigation Workflow and try again.')\n} else if (\n  !document.querySelector(\"#recordNumber\") || document.querySelector(\"#recordNumber\").innerText.startsWith(\"EZT\")\n) {\n  alert('Out of Scope Record: Converted records (EZT) are out of scope of tool.')\n} else {\n  if (document.getElementById('record-pane-content-iframe')) {\n    rwf = document.getElementById('record-pane-content-iframe').contentDocument;\n    cwf = rwf.getElementById('workSpaceFrame').contentDocument;\n    guide = rwf.getElementById('workSpaceFrame').contentWindow.entityDataStore.entityData['V_SS_CASE'];\n  } else {\n    cwf = document.getElementById('workSpaceFrame').contentDocument;\n    rwf = document;\n    guide = rwf.getElementById('workSpaceFrame').contentWindow.entityDataStore.entityData['V_SS_CASE'];\n  }\n  var nc_prefixes = ['ND', 'NC', 'SN'];\n  var lastCodeIdx = 1;\n\n  const svnElems = Array.from(\n    cwf.querySelectorAll('tbody[id^=\"V_SS_CASE-V_SS_CASE_PART_LOT_Grid_Detail_Canvas\"] tr')\n  ).filter(t => t.querySelector('input[id^=\"V_SS_CASE-V_SS_CASE_PART_LOT_SMP_TRACKING_NO\"]'));\n\n  var case_pli_data = {};\n  svnElems.forEach(elem => {\n    const svn = elem.querySelector('input[id^=\"V_SS_CASE-V_SS_CASE_PART_LOT_SMP_TRACKING_NO\"]');\n    Object.assign(case_pli_data, {\n      [svn.value]: {},\n    });\n    Object.assign(case_pli_data[svn.value], { data: elem.nextSibling });\n  });\n\n  /*// Scrape Codes\n  function getCodeBlocks(elem) {\n    const all_codes = { RFR: {}, FMC: {}, AFC: {} };\n    const blocks = Array.from(\n      elem.querySelectorAll(\n        'div[id*=\"V_SS_CASE-V_SS_CASE_PART_LOT-V_MD_CASE_OTHER_CODE_Grid_Canvas\"]'\n      )\n    );\n    let rgx = new RegExp(/[\\n|\\t]+/g);\n    const children = blocks.filter((b, i) => i % 2);\n    const parents = blocks.filter((b, i) => i % 2 == 0);\n    // Sanity Check\n    if (parents.every((rent, i) => rent.contains(children[i]))) {\n      children.forEach(c => {\n        const innerTxt = c.innerText.replace(rgx, '').trim();\n        let ctype = '';\n        if (innerTxt.startsWith('Reason Code')) {\n          ctype = 'RFR';\n        } else if (innerTxt.startsWith('Analysis Finding Code')) {\n          ctype = 'AFC';\n        } else if (innerTxt.startsWith('Failure Mode Code')) {\n          ctype = 'FMC';\n        }\n        if (ctype) {\n          Array.from(c.querySelectorAll('input')).reduce((agg, v) => {\n            if (v.id && !v.id.includes('NAME') && v.id.includes('OTHER_CODE_CODE_1')) {\n              Object.assign(agg, { [v.id]: v.value });\n            }\n            return agg;\n          }, all_codes[ctype]);\n        }\n      });\n      return all_codes;\n    } else {\n      alert('something unexpected happened!');\n    }\n    return;\n  }*/\n\n  // Get codes\n  function getCodeBlocks(svn) {\n    const all_codes = { RFR: {}, FMC: {}, AFC: {} };\n    if (\n      guide && guide['V_SS_CASE-V_SS_CASE_PART_LOT']\n    ) {\n      \n      let activePart;\n      if (\n        Array.isArray(guide['V_SS_CASE-V_SS_CASE_PART_LOT']) && \n        guide['V_SS_CASE-V_SS_CASE_PART_LOT'].some(p => p.SMP_TRACKING_NO == svn)\n      ) {\n        activePart = guide['V_SS_CASE-V_SS_CASE_PART_LOT'].find(p => p.SMP_TRACKING_NO == svn);\n      } else {\n        activePart = guide['V_SS_CASE-V_SS_CASE_PART_LOT'];\n      }\n      activePart['V_SS_CASE-V_SS_CASE_PART_LOT-V_MD_CASE_OTHER_CODE'].forEach(c => {\n        console.log(c.CODE_TYPE);\n        if (c.CODE_TYPE == 'REASON FOR REPORT') {\n          let fm;\n          let code;\n          if (c.CODE_1) {\n            code = c.CODE_1;\n            fm = c._fieldMappings.find(f => f.CODE_1).CODE_1[0];\n            Object.assign(all_codes.RFR, { [fm.id]: code });\n          } else if (c.CODE_5) {\n            code = c.CODE_5;\n            fm = c._fieldMappings.find(f => f.CODE_5).CODE_5[0];\n            Object.assign(all_codes.RFR, { [fm.id]: code });\n          }\n        } else if (c.CODE_TYPE == 'ANALYSIS FINDING') {\n          fm = c._fieldMappings.find(f => f.CODE_1).CODE_1[0];\n          Object.assign(all_codes.AFC, { [fm.id]: c.CODE_1 || '' });\n        } else if (c.CODE_TYPE == 'FAILURE MODE') {\n          fm = c._fieldMappings.find(f => f.CODE_1).CODE_1[0];\n          Object.assign(all_codes.FMC, { [fm.id]: c.CODE_1 || '' });\n        }\n      });\n      return all_codes;\n    } else {\n      alert('something unexpected happened!');\n    }\n    return;\n  }\n\n  // Specific Completion Logic Functions\n  function updateCustomerResponse() {\n    const custResp = cwf.querySelector('#ctrlContainer_V_SS_CASE_RESPONSE_REQUIRED_1');\n    const country = rwf.querySelector('#V_SS_CASE_COUNTRY_OF_ORIGIN_1');\n    if (custResp) {\n      let val;\n      if (country && country.value == 'BRAZIL') {\n        val = true;\n      } else if (!custResp.innerText || custResp.innerText == 'None') {\n        val = false;\n      } else {\n        val = true;\n      }\n      setRadio('V_SS_CASE_LETTER_CUSTOMER_1', val);\n    } else {\n      runErrors.push({\n        type: 'Customer Response',\n        detail: 'Customer Letter Task could not be updated',\n      });\n    }\n  }\n\n  // Complete Form Functions\n  function setRadio(elemId, value) {\n    const elem = cwf.querySelector(`#${elemId}`);\n    if (elem && elem.value != value) {\n      const radioChoice = cwf.querySelector(`#pRadioButton_${elemId}_${value}`);\n      if (radioChoice) {\n        radioChoice.click();\n      } else {\n        runErrors.push({ type: elemId, detail: `Could not update field to ${value}` });\n      }\n    } else {\n      runErrors.push({ type: elemId, detail: `Could not update field to ${value}` });\n    }\n  }\n  function setInput(elemId, value, auto = 'tAutoComplete') {\n    const element = cwf.getElementById(elemId);\n    if (element) {\n      if (element.value != value) {\n        const keys = Object.keys(element);\n        if (keys.some(k => k.startsWith('jQuery'))) {\n          const autoKey = keys.find(k => element[k] && element[k][auto]);\n          element[autoKey].tAutoComplete.value(value);\n          // Trigger event listeners to map other codes\n          element.dispatchEvent(new Event('dataBinding'));\n          element.dispatchEvent(new Event('valueChange'));\n          return;\n        }\n      }\n    }\n    throw Error('Could not find Element to set. Refresh window and re-try!');\n  }\n\n  // function getGuide(id) {\n  //   let frame;\n  //   if (!id) {\n  //     frame = document;\n  //   } else {\n  //     frame = document.getElementById(id);\n  //   }\n  //   if (frame) {\n  //     return Array.from(frame.querySelectorAll('input')).reduce((agg, elem) => {\n  //       if (elem.id && elem.id.startsWith('V_SS_CASE')) {\n  //         Object.assign(agg, { [elem.id]: elem.value || '' });\n  //       }\n  //       return agg;\n  //     }, {});\n  //   } else {\n  //     throw Error('could not find frame!');\n  //   }\n  // }\n  function getGuide(element) {\n    return Array.from(element.querySelectorAll(\"ul[class='formUL']\")).reduce((g, ul) => {\n      if (ul.hasChildNodes()) {\n        const label = ul.querySelector(\"div[id^='elementContainer_V_SS_CASE'] label\");\n        const value = ul.querySelector(\"div[id^='ctrlContainer_V_SS_CASE'] input\");\n        if (label && label.innerText && value) {\n          const rgx = new RegExp(/\\W+/g);\n          const l = label.innerText.replace(rgx, '');\n          Object.assign(g, { [l]: { htmlId: value.id, value: value.value } });\n        }\n      }\n      return g;\n    }, {});\n  }\n\n  function sleep(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n  }\n  function waitForElement(frame, elemId, maxTime = 5000) {\n    const start = Date.now();\n    return new Promise((resolve, reject) => {\n      // eslint-disable-next-line consistent-return\n      (function waitForFoo() {\n        if (Date.now() - start >= maxTime) {\n          return reject(new Error(`Exceed max waiting time for flower-${maxTime}`));\n        }\n        let f = rwf;\n        if (frame == 'workspace') {\n          f = rwf.querySelector('#workSpaceFrame').contentDocument;\n        }\n        let target = f.getElementById(elemId);\n        if (target) {\n          return resolve(1);\n        }\n        setTimeout(waitForFoo, 200);\n      })();\n    });\n  }\n\n  async function getDetails() {\n    let expands = Array.from(rwf.querySelectorAll('.detail-container a'));\n    if (expands && expands.some(t => t.innerText == 'Detail')) {\n      const recordDetail = expands.find(t => t.innerText == 'Detail');\n      let subElements = recordDetail.parentElement.parentElement.nextSibling.children;\n      if (Array.from(subElements).filter(child => child.className !== 'panel-row').length == 0) {\n        recordDetail.click();\n        await waitForElement('', 'V_SS_CASE_REPORT_DATE_1');\n      }\n      //\n      expands = Array.from(rwf.querySelectorAll('.detail-container a'));\n      if (expands && expands.some(t => t.innerText == 'Product Analysis')) {\n        const pa = expands.find(t => t.innerText == 'Product Analysis');\n        subElements = pa.parentElement.parentElement.nextSibling.children;\n        if (Array.from(subElements).filter(child => child.className !== 'panel-row').length == 0) {\n          pa.click();\n          sleep(500);\n        }\n        const d = pa.parentElement.parentElement.nextSibling;\n        const details = Array.from(\n          d.querySelectorAll(\n            \"tbody[id^='V_SS_CASE-V_SS_CASE_PART_LOT_Grid_Detail_Canvas'] tr[class^='ui-subgrid']\"\n          )\n        );\n        let part_lots;\n        if (!Array.isArray(guide['V_SS_CASE-V_SS_CASE_PART_LOT'])) {\n          part_lots = [guide['V_SS_CASE-V_SS_CASE_PART_LOT']];\n        } else {\n          part_lots = [...guide['V_SS_CASE-V_SS_CASE_PART_LOT']];\n        }\n        let products = part_lots.map(p => {\n          return {\n            svn: p.SMP_TRACKING_NO,\n            receipt: p.INVEST_CONFIRM_COMP,\n            status: p.PRT_EVALUATION_STATUS,\n          }\n        });\n\n        let result = {};\n        let codeIds = [];\n        products.forEach((prod, i) => {\n          const paFields = getGuide(details[i]);\n          const invFields = getGuide(case_pli_data[prod.svn].data);\n          const codes = getCodeBlocks(prod.svn);\n          result[prod.svn] = { ...paFields, ...invFields };\n          result[prod.svn].AnalysisStatus = prod.status;\n          result[prod.svn].Codes = codes;\n          result[prod.svn].SVN = prod.svn;\n          codeIds = [...codeIds, ...Object.keys(codes.RFR), ...Object.keys(codes.AFC), ...Object.keys(codes.FMC)]\n        });\n        lastCodeIdx = codeIds.map(id => Number(id.split('_').pop())).sort((a, b) => a - b).pop();\n        return result;\n      }\n    }\n    throw Error('Could not find record detail. Refresh window and try again.');\n  }\n  async function completeTheActions() {\n    try {\n      const details = await getDetails();\n      Object.values(details).forEach(svn => {\n        const codes = svn.Codes;\n        let targetId;\n        let targetVal;\n        let mapVal;\n        if (svn.AnalysisStatus == 'COMPLETED' && eval(svn.IsProductAnalysisRequired.value)) {\n          targetId = svn.DevicePerSpecification.htmlId;\n          mapVal = svn.AnalysisIdentifiedProductMeetsSpecification.value;\n          switch (mapVal) {\n            case 'true':\n              targetVal = 'Yes';\n              break;\n            case 'false':\n              targetVal = 'No';\n              break;\n            default:\n              targetVal = 'Yes';\n              break;\n          }\n          setRadio(targetId, targetVal);\n        } else if (svn.AnalysisStatus == 'IN PROGRESS') {\n          alert('Product Analysis Task is IN PROGRESS!');\n        } else {\n          targetId = svn.DevicePerSpecification.htmlId;\n          setRadio(targetId, 'Yes');\n          if (Object.keys(codes.AFC).length == 1) {\n            targetId = Object.keys(codes.AFC)[0];\n            setInput(targetId, 'ZA18AF', 'tAutoComplete');\n          } else {\n            alert(`Unexpected finding in AFC Code Block. Please Review`);\n          }\n          if (Object.values(codes.RFR).length > 0) {\n            let fmcIndex = 0;\n            let fmcIds = Object.keys(codes.FMC);\n            Object.values(codes.RFR).forEach(rfr => {\n              if (\n                !nc_prefixes.some(nc => rfr.startsWith(nc)) &&\n                rfr != 'DH01' &&\n                rfr != 'DA99'\n              ) {\n                const fmcValue = `${rfr}U`;\n                let fmcId;\n                if (fmcIds[fmcIndex]) {\n                  fmcId = fmcIds[fmcIndex];\n                } else {\n                  // click button to add FMC\n                  const currentElemBlock = case_pli_data[svn.SVN].data;\n                  Array.from(currentElemBlock.querySelectorAll('span')).find(s => s.innerText == 'Add Failure Mode Code').click()\n                  lastCodeIdx += 1;\n                  const baseId = 'V_SS_CASE-V_SS_CASE_PART_LOT-V_MD_CASE_OTHER_CODE_CODE_1';\n                  fmcId = `${baseId}_${lastCodeIdx}`;\n                }\n                setInput(fmcId, fmcValue, 'tAutoComplete');\n                fmcIndex += 1;\n              }\n            });\n            if (!cwf.getElementById(fmcIds[0]).value) {\n              setInput(fmcIds[0], 'NC00U', 'tAutoComplete');\n            }\n          }\n        }\n      });\n      updateCustomerResponse();\n    } catch (e) {\n      alert(`Error Occurred: ${e.message}`);\n    }\n  }\n  //start by checking for in scope record\n  const invsummElem = cwf.querySelector(\n    '#textArea_V_SS_CASE-V_SS_CASE_PATIENT_INFO_MD_INVESTIGATION_SUMMARY_1'\n  );\n  if (invsummElem && !invsummElem.value) {\n    let ok2complete = true;\n    let reason = '';\n    const invActDetails = Array.from(\n      cwf.querySelectorAll('tbody[id*=V_SS_CASE-V_ESG_ENTITY_SIGNATURE_Grid_Detail] tr')\n    ).splice(1);\n    \n    invActDetails.forEach(row => {\n      const items = row.innerText.split('\\t').splice(1, 4);\n      const step = items[0];\n      if (step.toUpperCase().indexOf('ADDITIONAL INVESTIGATION') >= 0) {\n        ok2complete = false;\n        reason = 'Additional Investigation exists.\\n';\n      }\n    });\n    if (Array.from(rwf.querySelectorAll('a')).some(a => a.innerText == 'Other Tasks')) {\n      const  othTasksElem = Array.from(rwf.querySelectorAll('a')).find(a => a.innerText == 'Other Tasks').parentElement;\n      Array.from(othTasksElem.querySelectorAll('li[class*=\"mega-unit mega-hdr\"] a[class*=\"mega-hdr-a\"]')).forEach(a => {\n        if (a.innerText.indexOf(\"Investigation Workflow\") < 0) {\n          reason += `${a.innerText} is not Completed!\\n`;\n          ok2complete = false;\n        }\n      })\n      if (ok2complete) {\n        completeTheActions();\n        //alert('success!');\n      } else {\n        alert(`Out of Scope Record: ${reason}`);\n      }\n    } else {\n      alert('Could not identify Other Tasks. Please verify SmartSolve location. ')\n    }\n  } else {\n    // probably a reopened record, which is out of scope\n    alert('Out of scope. Suspected re-opened record, Investigation summary already completed!');\n  }\n}\n\n\n//# sourceURL=webpack:///./smartsolve.js?");

/***/ })

/******/ });
