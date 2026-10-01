Add-Type -AssemblyName System.Drawing

function Process-Header {
  param([string]$inPath, [string]$outPath, [int]$newWidth)

  $src = [System.Drawing.Bitmap]::FromFile($inPath)
  $scale = $newWidth / $src.Width
  $w = $newWidth
  $h = [int]($src.Height * $scale)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $bmp.SetResolution(96, 96)

  for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
      $p = $src.GetPixel([int]($x / $scale), [int]($y / $scale))
      $bright = ($p.R + $p.G + $p.B) / 3
      $sat = [Math]::Max($p.R, [Math]::Max($p.G, $p.B)) - [Math]::Min($p.R, [Math]::Min($p.G, $p.B))

      if ($p.A -gt 200 -and $bright -gt 185 -and $sat -lt 40) {
        # apenas texto branco OPACO -> cafe escuro; pixels transparentes ficam intactos
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 36, 28, 22))
      }
      else {
        $bmp.SetPixel($x, $y, $p)
      }
    }
  }
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "$outPath ok (${w}x${h})"
}

function Composite-Test {
  param([string]$logoPath, [string]$outPath)
  $logo = [System.Drawing.Bitmap]::FromFile($logoPath)
  $bmp = New-Object System.Drawing.Bitmap($logo.Width, $logo.Height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::FromArgb(255, 250, 246, 241))
  $g.DrawImage($logo, 0, 0, $logo.Width, $logo.Height)
  $g.Dispose()
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  $logo.Dispose()
  Write-Host "$outPath ok"
}

$base = "C:\Users\alanb\.verdent\verdent-projects\httpsglowelloficialcombr-https\src\assets"
$logos = "C:\Users\alanb\.verdent\verdent-projects\_rita_docs_tmp2\docs_tmp\drive_assets\logos"

# header: recolore so o texto branco opaco para cafe; fundo transparente preservado
Process-Header -inPath "$logos\l4.png" -outPath "$base\logo-header.png" -newWidth 720
# footer: original direto (carmim + branco sobre transparente)
Copy-Item "$logos\l4.png" "$base\logo-footer.png" -Force
# simbolo/favicon: original direto
Copy-Item "$logos\ic1.png" "$base\logo-mark.png" -Force
Copy-Item "$base\logo-mark.png" "C:\Users\alanb\.verdent\verdent-projects\httpsglowelloficialcombr-https\public\favicon.png" -Force

Composite-Test -logoPath "$base\logo-header.png" -outPath "$base\logo-header-teste-fundo-claro.png"

# checagem de pixels
$chk = [System.Drawing.Bitmap]::FromFile("$base\logo-header.png")
Write-Host 'header pixel(5,5):' $chk.GetPixel(5,5)
Write-Host 'header pixel(470,2):' $chk.GetPixel(470,2)
$chk.Dispose()
