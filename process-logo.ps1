Add-Type -AssemblyName System.Drawing

function Process-Logo {
  param([string]$inPath, [string]$outPath, [bool]$recolorWhite, [int]$newWidth)

  $src = [System.Drawing.Image]::FromFile($inPath)
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

      if ($bright -lt 45 -and $sat -lt 25) {
        # fundo preto -> transparente (com suavizacao parcial)
        $alpha = [Math]::Max(0, [int]((45 - $bright) / 45 * 255))
        if ($alpha -gt 40) { $alpha = 0 } else { $alpha = [Math]::Min($alpha, 90) }
        $carmim = [System.Drawing.Color]::FromArgb($alpha, 214, 69, 97)
        $bmp.SetPixel($x, $y, $carmim)
      }
      elseif ($recolorWhite -and $bright -gt 185 -and $sat -lt 40) {
        # texto branco -> cafe escuro (para uso em fundo claro)
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

$base = "C:\Users\alanb\.verdent\verdent-projects\httpsglowelloficialcombr-https\src\assets"

# header: fundo claro -> branco vira cafe
Process-Logo -inPath "$base\logo-raw.png" -outPath "$base\logo-header.png" -recolorWhite $true -newWidth 640
# rodape / fundos escuros: mantem branco
Process-Logo -inPath "$base\logo-raw.png" -outPath "$base\logo-footer.png" -recolorWhite $false -newWidth 640
# simbolo para favicon
Process-Logo -inPath "$base\mark-raw.png" -outPath "$base\logo-mark.png" -recolorWhite $false -newWidth 128
